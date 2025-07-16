# 🔧 COMANDOS ÚTEIS - MERCADO LIVRE CLONE

## 🚀 INICIALIZAÇÃO

### Primeira vez (setup completo):
```bash
# Backend
cd mercado-livre-backend
npm install
docker-compose up -d
node src/server.js

# Frontend (novo terminal)
cd mercado-livre-app
npm install
npm run dev
```

### Uso diário:
```bash
# Iniciar backend
cd mercado-livre-backend && docker-compose up -d && node src/server.js

# Iniciar frontend
cd mercado-livre-app && npm run dev
```

## 🐳 DOCKER

```bash
# Iniciar MySQL
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f mysql

# Resetar banco (apaga dados)
docker-compose down && docker volume prune -f && docker-compose up -d

# Ver containers rodando
docker ps

# Acessar MySQL diretamente
docker exec -it [container-id] mysql -u root -p
```

## 📡 TESTES DA API

### Curl (terminal):
```bash
# Testar API
curl http://localhost:3001/api

# Listar produtos
curl http://localhost:3001/api/products

# Produto específico
curl http://localhost:3001/api/products/1

# Criar produto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","descricao":"Produto teste","preco":100,"categoria":"Teste","estoque":10}'
```

### PowerShell:
```powershell
# Testar API
Invoke-WebRequest -Uri "http://localhost:3001/api" -Method GET

# Listar produtos
Invoke-WebRequest -Uri "http://localhost:3001/api/products" -Method GET

# Criar produto
$body = @{
    nome = "Produto Teste"
    descricao = "Descrição teste"
    preco = 99.99
    categoria = "Eletrônicos"
    estoque = 50
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/products" -Method POST -Body $body -ContentType "application/json"
```

## 🔍 DEBUGGING

### Logs importantes:
```bash
# Ver logs do servidor
# (saída do terminal onde rodou node src/server.js)

# Ver logs do Docker
docker-compose logs -f

# Ver logs específicos do MySQL
docker-compose logs mysql
```

### Verificar portas:
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3001
netstat -ano | findstr :3306

# Matar processo
taskkill /PID [PID_NUMBER] /F
```

### Verificar serviços:
```bash
# Testar se MySQL está rodando
docker ps | grep mysql

# Testar se API está respondendo
curl http://localhost:3001/health

# Testar se frontend está rodando
curl http://localhost:3000
```

## 📦 NPM/YARN

```bash
# Instalar dependências
npm install

# Instalar nova dependência
npm install [package-name]

# Remover dependência
npm uninstall [package-name]

# Ver dependências desatualizadas
npm outdated

# Atualizar dependências
npm update

# Limpar cache
npm cache clean --force

# Reinstalar tudo
rm -rf node_modules package-lock.json && npm install
```

## 🗄️ MYSQL

### Comandos diretos:
```sql
-- Conectar ao banco
mysql -h localhost -P 3306 -u root -p

-- Usar banco
USE mercado_livre_db;

-- Ver tabelas
SHOW TABLES;

-- Ver estrutura da tabela
DESCRIBE produtos;

-- Listar produtos
SELECT * FROM produtos;

-- Contar registros
SELECT COUNT(*) FROM produtos;

-- Limpar tabela
TRUNCATE TABLE produtos;
```

### Via phpMyAdmin:
```
URL: http://localhost:8082
Usuário: root
Senha: minhasenha123
```

## 🌐 URLS IMPORTANTES

```bash
# Frontend
http://localhost:3000                    # Página inicial
http://localhost:3000/products           # Lista produtos
http://localhost:3000/products/1         # Produto específico
http://localhost:3000/users              # Usuários

# Backend
http://localhost:3001/api                # Info da API
http://localhost:3001/api/products       # Produtos
http://localhost:3001/api/users          # Usuários
http://localhost:3001/health             # Status

# Documentação
http://localhost:3001/api-docs           # Swagger UI
http://localhost:3001/api-docs.json      # Swagger JSON

# Banco
http://localhost:8082                    # phpMyAdmin
```

## 🔧 DESENVOLVIMENTO

### Modificações comuns:
```bash
# Adicionar nova rota no backend
# 1. Editar: src/routes/products.js
# 2. Reiniciar: node src/server.js

# Modificar frontend
# 1. Editar arquivos em src/
# 2. Salvar (hot reload automático)

# Modificar banco
# 1. Editar: docker/mysql/scripts/01-init.sql
# 2. Recriar: docker-compose down && docker volume prune -f && docker-compose up -d
```

### Build para produção:
```bash
# Frontend
npm run build
npm start

# Backend
npm run start
```

## 🚨 TROUBLESHOOTING

### Erro "Cannot find module":
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro "Port already in use":
```bash
# Encontrar processo
netstat -ano | findstr :3000

# Matar processo
taskkill /PID [PID] /F
```

### Erro "MySQL connection failed":
```bash
# Verificar Docker
docker ps

# Reiniciar MySQL
docker-compose restart mysql

# Ver logs
docker-compose logs mysql
```

### Erro "Cannot connect to API":
```bash
# Verificar se backend está rodando
curl http://localhost:3001/api

# Verificar CORS
# Deve permitir http://localhost:3000
```

### Frontend não carrega produtos:
```bash
# 1. Verificar se API está rodando
curl http://localhost:3001/api/products

# 2. Verificar DevTools > Network
# 3. Verificar console por erros
```

## 📝 ARQUIVOS DE CONFIGURAÇÃO

### Backend (.env):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mercado_livre_db
DB_USER=root
DB_PASSWORD=minhasenha123
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

---

**💡 Dica:** Mantenha sempre 2 terminais abertos - um para backend, outro para frontend!

**📚 Documentação completa:** Ver `DOCUMENTACAO_COMPLETA.md`
