const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Listar todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados
 *     responses:
 *       200:
 *         description: Lista de usuários recuperada com sucesso
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
 *                     $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "Usuários encontrados com sucesso"
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', async (req, res) => {
  try {
    // Simulando dados por enquanto
    const users = [
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "(11) 99999-9999",
        endereco: "Rua das Flores, 123",
        data_criacao: new Date()
      },
      {
        id: 2,
        nome: "Maria Santos",
        email: "maria@email.com",
        telefone: "(11) 88888-8888",
        endereco: "Av. Principal, 456",
        data_criacao: new Date()
      }
    ];

    res.json({
      success: true,
      data: users,
      message: "Usuários encontrados com sucesso"
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Buscar usuário por ID
 *     description: Retorna os dados de um usuário específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "Usuário encontrado com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulando busca por ID
    const user = {
      id: parseInt(id),
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123",
      data_criacao: new Date()
    };

    if (parseInt(id) > 10) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    res.json({
      success: true,
      data: user,
      message: "Usuário encontrado com sucesso"
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Criar novo usuário
 *     description: Cria um novo usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               telefone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Nome, email e senha são obrigatórios"
      });
    }

    // Simulando criação do usuário
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      nome,
      email,
      telefone: telefone || null,
      endereco: endereco || null,
      data_criacao: new Date()
    };

    res.status(201).json({
      success: true,
      data: newUser,
      message: "Usuário criado com sucesso"
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
});

module.exports = router;
