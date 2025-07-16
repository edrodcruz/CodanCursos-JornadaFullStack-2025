const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Configuração da conexão com o banco de dados MySQL
 * 
 * Este arquivo é responsável por:
 * 1. Criar a conexão com o MySQL
 * 2. Configurar o pool de conexões (para performance)
 * 3. Exportar a conexão para uso em outros arquivos
 */

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'mercado_livre_user',
  password: process.env.DB_PASSWORD || 'mercado123',
  database: process.env.DB_NAME || 'mercado_livre_db',
  waitForConnections: true,
  connectionLimit: 10,        // Máximo de 10 conexões simultâneas
  queueLimit: 0,             // Sem limite de fila
  acquireTimeout: 60000,     // 60 segundos para obter conexão
  timeout: 60000,            // 60 segundos timeout para queries
  reconnect: true,           // Reconecta automaticamente
  charset: 'utf8mb4'         // Suporte completo para emojis e caracteres especiais
});

/**
 * Função para testar a conexão com o banco
 * @returns {Promise<boolean>} - True se conectou, false caso contrário
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao banco MySQL com sucesso!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error.message);
    return false;
  }
}

/**
 * Função para executar queries SQL
 * @param {string} query - A query SQL a ser executada
 * @param {Array} params - Parâmetros para a query (opcional)
 * @returns {Promise<Array>} - Resultado da query
 */
async function executeQuery(query, params = []) {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('❌ Erro ao executar query:', error.message);
    throw error;
  }
}

/**
 * Função para executar transações (operações que precisam ser atômicas)
 * @param {Function} callback - Função que contém as operações da transação
 * @returns {Promise<any>} - Resultado da transação
 */
async function transaction(callback) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Exporta o pool e as funções utilitárias
module.exports = {
  pool,
  testConnection,
  executeQuery,
  transaction
};
