-- Criação do banco de dados Mercado Livre
CREATE DATABASE IF NOT EXISTS mercado_livre_db;
USE mercado_livre_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone VARCHAR(50),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    preco_original DECIMAL(10, 2),
    categoria_id INT,
    estoque INT DEFAULT 0,
    imagem_url VARCHAR(500),
    frete_gratis BOOLEAN DEFAULT FALSE,
    avaliacao DECIMAL(2, 1) DEFAULT 0,
    total_avaliacoes INT DEFAULT 0,
    vendedor_id INT,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
);

-- Tabela de endereços
CREATE TABLE IF NOT EXISTS enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    padrao BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    endereco_id INT NOT NULL,
    status ENUM('pendente', 'confirmado', 'enviado', 'entregue', 'cancelado') DEFAULT 'pendente',
    valor_total DECIMAL(10, 2) NOT NULL,
    valor_frete DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id)
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Tabela de carrinho
CREATE TABLE IF NOT EXISTS carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    UNIQUE KEY unique_usuario_produto (usuario_id, produto_id)
);

-- Inserindo dados de exemplo - Categorias
INSERT INTO categorias (nome, descricao, icone) VALUES
('Eletrônicos', 'Smartphones, notebooks, tablets e mais', 'Smartphone'),
('Casa e Jardim', 'Móveis, decoração e utilidades domésticas', 'Home'),
('Moda', 'Roupas, calçados e acessórios', 'Shirt'),
('Esportes', 'Equipamentos esportivos e fitness', 'Dumbbell'),
('Livros', 'Livros físicos e digitais', 'Book'),
('Beleza', 'Cosméticos, perfumes e cuidados pessoais', 'Sparkles'),
('Automóveis', 'Peças e acessórios para veículos', 'Car'),
('Brinquedos', 'Jogos e brinquedos para todas as idades', 'Gamepad2');

-- Inserindo dados de exemplo - Usuários
INSERT INTO usuarios (nome, email, senha, telefone, data_nascimento) VALUES
('João Silva', 'joao.silva@email.com', '$2a$10$8X7tYQqz9.tPQCHj/xLpfuDwcvGz0QmL1yKqN4.3qUXnJjK1LKUaC', '11999999999', '1985-05-15'),
('Maria Santos', 'maria.santos@email.com', '$2a$10$8X7tYQqz9.tPQCHj/xLpfuDwcvGz0QmL1yKqN4.3qUXnJjK1LKUaC', '11888888888', '1990-08-22'),
('Pedro Oliveira', 'pedro.oliveira@email.com', '$2a$10$8X7tYQqz9.tPQCHj/xLpfuDwcvGz0QmL1yKqN4.3qUXnJjK1LKUaC', '11777777777', '1982-12-10');

-- Inserindo dados de exemplo - Produtos
INSERT INTO produtos (nome, descricao, preco, preco_original, categoria_id, estoque, imagem_url, frete_gratis, avaliacao, total_avaliacoes, vendedor_id) VALUES
('iPhone 15 Pro Max 256GB', 'Smartphone Apple iPhone 15 Pro Max com 256GB de armazenamento', 8999.99, 9999.99, 1, 50, 'https://example.com/iphone15.jpg', TRUE, 4.8, 245, 1),
('Samsung Galaxy S24 Ultra', 'Smartphone Samsung Galaxy S24 Ultra 512GB', 7599.99, 7999.99, 1, 30, 'https://example.com/galaxy-s24.jpg', TRUE, 4.7, 189, 1),
('Notebook Dell Inspiron 15', 'Notebook Dell Inspiron 15 Intel Core i7 16GB RAM 512GB SSD', 3499.99, 3999.99, 1, 25, 'https://example.com/dell-inspiron.jpg', TRUE, 4.5, 98, 2),
('Sofá 3 Lugares Cinza', 'Sofá retrátil e reclinável 3 lugares em tecido suede', 1299.99, 1599.99, 2, 10, 'https://example.com/sofa.jpg', FALSE, 4.3, 67, 2),
('Tênis Nike Air Max', 'Tênis Nike Air Max masculino para corrida', 399.99, 499.99, 3, 100, 'https://example.com/nike-air-max.jpg', TRUE, 4.6, 156, 3),
('Livro Clean Code', 'Livro Clean Code: A Handbook of Agile Software Craftsmanship', 89.99, 119.99, 5, 200, 'https://example.com/clean-code.jpg', TRUE, 4.9, 334, 1);

-- Inserindo dados de exemplo - Endereços
INSERT INTO enderecos (usuario_id, nome, cep, endereco, numero, complemento, bairro, cidade, estado, padrao) VALUES
(1, 'Casa', '01310-100', 'Av. Paulista', '1578', 'Apt 102', 'Bela Vista', 'São Paulo', 'SP', TRUE),
(2, 'Trabalho', '04038-001', 'Rua Vergueiro', '3185', 'Sala 501', 'Vila Mariana', 'São Paulo', 'SP', FALSE),
(3, 'Residência', '22070-900', 'Av. Atlântica', '1702', 'Cobertura', 'Copacabana', 'Rio de Janeiro', 'RJ', TRUE);

COMMIT;
