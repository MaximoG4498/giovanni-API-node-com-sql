import { pool } from "../config/db.js";

export const usuarioModel = {
  // Insere um novo usuário usando query parametrizada
  async criar(nome, email) {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  },

  // Lista todos os registros da tabela
  async listarTodos() {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows;
  },

  // Busca um usuário específico por ID
  async buscarPorId(id) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0] || null;
  },

  // Atualiza nome e/ou email usando query parametrizada
  async atualizar(id, nome, email) {
    const [result] = await pool.query(
      "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
      [nome || null, email || null, id]
    );
    return result.affectedRows > 0;
  },

  // Remove um usuário pelo ID
  async deletar(id) {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};
