const swaggerJSDoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mercado Livre API',
      version: '1.0.0',
      description: 'API REST para clone do Mercado Livre - Sistema completo de e-commerce',
      contact: {
        name: 'Equipe de Desenvolvimento',
        email: 'dev@mercadolivre.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api.mercadolivre.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do usuário'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            telefone: {
              type: 'string',
              description: 'Telefone do usuário'
            },
            data_nascimento: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['nome', 'preco', 'categoria_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do produto'
            },
            nome: {
              type: 'string',
              description: 'Nome do produto'
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada do produto'
            },
            preco: {
              type: 'number',
              format: 'float',
              description: 'Preço atual do produto'
            },
            preco_original: {
              type: 'number',
              format: 'float',
              description: 'Preço original (antes do desconto)'
            },
            categoria_id: {
              type: 'integer',
              description: 'ID da categoria'
            },
            estoque: {
              type: 'integer',
              description: 'Quantidade em estoque'
            },
            imagem_url: {
              type: 'string',
              description: 'URL da imagem do produto'
            },
            frete_gratis: {
              type: 'boolean',
              description: 'Indica se tem frete grátis'
            },
            avaliacao: {
              type: 'number',
              format: 'float',
              description: 'Avaliação média (0-5)'
            },
            total_avaliacoes: {
              type: 'integer',
              description: 'Total de avaliações recebidas'
            },
            ativo: {
              type: 'boolean',
              description: 'Indica se o produto está ativo'
            }
          }
        },
        Category: {
          type: 'object',
          required: ['nome'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da categoria'
            },
            nome: {
              type: 'string',
              description: 'Nome da categoria'
            },
            descricao: {
              type: 'string',
              description: 'Descrição da categoria'
            },
            icone: {
              type: 'string',
              description: 'Nome do ícone da categoria'
            },
            ativo: {
              type: 'boolean',
              description: 'Indica se a categoria está ativa'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            details: {
              type: 'string',
              description: 'Detalhes adicionais do erro'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de acesso ausente ou inválido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ValidationError: {
          description: 'Erro de validação dos dados',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFoundError: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/server.js'], // Caminhos para arquivos com anotações
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
