const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Listar todos os produtos
 *     description: Retorna uma lista de todos os produtos disponíveis
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoria
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de produtos a retornar
 *     responses:
 *       200:
 *         description: Lista de produtos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *                   example: "Produtos encontrados com sucesso"
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', async (req, res) => {
  try {
    const { categoria, limite = 10 } = req.query;
    
    // Simulando dados de produtos
    let products = [
      {
        id: 1,
        nome: "iPhone 15 Pro",
        descricao: "Smartphone Apple mais avançado",
        preco: 7999.99,
        categoria: "Eletrônicos",
        estoque: 50,
        imagem: "/images/iphone15.jpg",
        data_criacao: new Date()
      },
      {
        id: 2,
        nome: "Samsung Galaxy S24",
        descricao: "Flagship Samsung com IA",
        preco: 6999.99,
        categoria: "Eletrônicos",
        estoque: 35,
        imagem: "/images/galaxy-s24.jpg",
        data_criacao: new Date()
      },
      {
        id: 3,
        nome: "Notebook Dell XPS 13",
        descricao: "Ultrabook profissional",
        preco: 8999.99,
        categoria: "Informática",
        estoque: 20,
        imagem: "/images/dell-xps13.jpg",
        data_criacao: new Date()
      },
      {
        id: 4,
        nome: "Tênis Nike Air Max",
        descricao: "Tênis esportivo confortável",
        preco: 599.99,
        categoria: "Esportes",
        estoque: 100,
        imagem: "/images/nike-airmax.jpg",
        data_criacao: new Date()
      }
    ];

    // Filtrar por categoria se especificado
    if (categoria) {
      products = products.filter(p => 
        p.categoria.toLowerCase().includes(categoria.toLowerCase())
      );
    }

    // Limitar resultados
    products = products.slice(0, parseInt(limite));

    res.json({
      success: true,
      data: products,
      message: "Produtos encontrados com sucesso"
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Buscar produto por ID
 *     description: Retorna os dados de um produto específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *                   example: "Produto encontrado com sucesso"
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulando busca por ID
    const product = {
      id: parseInt(id),
      nome: "iPhone 15 Pro",
      descricao: "Smartphone Apple mais avançado com chip A17 Pro",
      preco: 7999.99,
      categoria: "Eletrônicos",
      estoque: 50,
      imagem: "/images/iphone15.jpg",
      especificacoes: {
        tela: "6.1 polegadas",
        memoria: "128GB",
        camera: "48MP principal",
        bateria: "3274 mAh"
      },
      data_criacao: new Date()
    };

    if (parseInt(id) > 100) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado"
      });
    }

    res.json({
      success: true,
      data: product,
      message: "Produto encontrado com sucesso"
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Criar novo produto
 *     description: Adiciona um novo produto ao catálogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - preco
 *               - categoria
 *               - estoque
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               descricao:
 *                 type: string
 *                 example: "Smartphone Apple mais avançado"
 *               preco:
 *                 type: number
 *                 example: 7999.99
 *               categoria:
 *                 type: string
 *                 example: "Eletrônicos"
 *               estoque:
 *                 type: integer
 *                 example: 50
 *               imagem:
 *                 type: string
 *                 example: "/images/iphone15.jpg"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *                   example: "Produto criado com sucesso"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, estoque, imagem } = req.body;

    // Validação básica
    if (!nome || !descricao || !preco || !categoria || estoque === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nome, descrição, preço, categoria e estoque são obrigatórios"
      });
    }

    // Simulando criação do produto
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      estoque: parseInt(estoque),
      imagem: imagem || null,
      data_criacao: new Date()
    };

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Produto criado com sucesso"
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

module.exports = router;
