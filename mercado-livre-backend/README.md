# 🚀 Mercado Livre Backend - API REST

API REST para o clone do Mercado Livre, construída com **Node.js**, **Express** e **MySQL**.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL 8.0** - Banco de dados relacional
- **Docker** - Containerização
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **express-validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose instalados
- npm ou yarn

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Subir o banco MySQL com Docker
```bash
npm run docker:up
```

### 3. Executar a aplicação
```bash
npm run dev
```

### 4. Acessar a aplicação
- **API**: http://localhost:3001
- **phpMyAdmin**: http://localhost:8082

## 📊 Banco de Dados

### Credenciais MySQL:
- **Host**: localhost:3306
- **Database**: mercado_livre_db
- **User**: mercado_livre_user
- **Password**: mercado123
- **Root Password**: root123

### Tabelas Criadas:
- `usuarios` - Informações dos usuários
- `categorias` - Categorias de produtos
- `produtos` - Catálogo de produtos
- `enderecos` - Endereços dos usuários
- `pedidos` - Pedidos realizados
- `itens_pedido` - Itens dos pedidos
- `carrinho` - Carrinho de compras

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run start        # Executa em modo produção
npm run docker:up    # Sobe o MySQL no Docker
npm run docker:down  # Para o MySQL no Docker
npm run docker:logs  # Visualiza logs do Docker
npm run db:reset     # Reseta o banco de dados
```

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js      # Configuração do banco
├── controllers/         # Controladores da API
├── middleware/          # Middlewares customizados
├── models/             # Modelos de dados
├── routes/             # Rotas da API
├── utils/              # Utilitários
└── server.js           # Servidor principal
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Buscar categoria

### Carrinho
- `GET /api/cart` - Itens do carrinho
- `POST /api/cart` - Adicionar ao carrinho
- `PUT /api/cart/:id` - Atualizar item
- `DELETE /api/cart/:id` - Remover item

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/:id` - Buscar pedido

## 🛡️ Segurança

- Helmet para headers de segurança
- CORS configurado
- Rate limiting
- Validação de dados
- Autenticação JWT
- Senhas criptografadas

## 🚀 Próximos Passos

- [ ] Implementar upload de imagens
- [ ] Sistema de avaliações
- [ ] Notificações em tempo real
- [ ] Integração com gateway de pagamento
- [ ] Logs estruturados
- [ ] Testes unitários
- [ ] Documentação da API (Swagger)

---

**Desenvolvido como parte do projeto de clone do Mercado Livre**
