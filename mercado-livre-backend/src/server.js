const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

// Importa a configuração do banco de dados
const { testConnection } = require('./config/database');

/**
 * SERVIDOR PRINCIPAL DA API MERCADO LIVRE
 * 
 * Este arquivo é o coração da nossa API. Ele:
 * 1. Configura o servidor Express
 * 2. Adiciona middlewares de segurança
 * 3. Define as rotas da API
 * 4. Inicia o servidor
 */

// Cria a aplicação Express
const app = express();

// Configuração da porta (3001 ou a definida no .env)
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARES GLOBAIS
// ========================================

// 1. Helmet - Adiciona cabeçalhos de segurança
app.use(helmet());

// 2. CORS - Permite requisições do frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// 3. Rate Limiting - Limita tentativas de acesso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.'
  }
});
app.use('/api/', limiter);

// 4. Morgan - Log das requisições
app.use(morgan('combined'));

// 5. Express JSON - Parse do corpo das requisições
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========================================
// DOCUMENTAÇÃO DA API (SWAGGER)
// ========================================

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de teste da API
 *     description: Verifica se a API está funcionando e retorna informações básicas
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "🚀 API Mercado Livre funcionando!"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 endpoints:
 *                   type: object
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificação de saúde da API
 *     description: Retorna o status da API e conexão com o banco de dados
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Sistema funcionando normalmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 database:
 *                   type: string
 *                   example: "Connected"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Tempo de atividade em segundos
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mercado Livre API Documentation',
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestHeaders: false,
    tryItOutEnabled: true
  }
}));

// Rota para baixar o JSON da documentação
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ========================================
// ROTAS DA API
// ========================================

// Rota de teste para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Mercado Livre funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    documentation: {
      swagger: 'http://localhost:3001/api-docs',
      json: 'http://localhost:3001/api-docs.json'
    },
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      users: '/api/users'
    }
  });
});

// Rota para verificar a saúde da API
app.get('/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.json({
      status: 'OK',
      database: dbConnected ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
});

// ========================================
// IMPORTAÇÃO DAS ROTAS
// ========================================

// Importar as rotas
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

// Configurar as rotas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// Rota principal da API
app.get('/api', (req, res) => {
  res.json({
    message: 'API do Mercado Livre está funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      documentation: '/api-docs'
    }
  });
});

// ========================================
// MIDDLEWARE DE ERRO GLOBAL
// ========================================

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe nesta API`,
    availableRoutes: [
      'GET /',
      'GET /health',
      'GET /api/products',
      'GET /api/categories'
    ]
  });
});

// Middleware para tratamento de erros globais
app.use((error, req, res, next) => {
  console.error('❌ Erro na aplicação:', error);
  
  res.status(error.status || 500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

async function startServer() {
  try {
    // Testa a conexão com o banco antes de iniciar
    console.log('🔍 Testando conexão com o banco de dados...');
    await testConnection();
    
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`
🚀 Servidor rodando com sucesso!
📍 URL: http://localhost:${PORT}
🗄️  Banco: MySQL (localhost:3306)
📱 phpMyAdmin: http://localhost:8082
🌍 Ambiente: ${process.env.NODE_ENV || 'development'}
⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}
      `);
    });
    
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();

// Exporta o app para testes
module.exports = app;
