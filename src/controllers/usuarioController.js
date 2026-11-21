import { usuarioModel } from "../models/usuarioModel.js";

export const usuarioController = {
  // POST /usuarios
  async criar(req, res) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
      }

      const novoUsuario = await usuarioModel.criar(nome, email);
      return res.status(201).json(novoUsuario);
    } catch (e) {
      return res.status(500).json({ erro: "Falha ao criar usuário" });
    }
  },

  // GET /usuarios
  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.listarTodos();
      return res.status(200).json(usuarios);
    } catch (e) {
      return res.status(500).json({ erro: "Falha ao listar usuários" });
    }
  },

  // PUT /usuarios/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const atualizado = await usuarioModel.atualizar(id, nome, email);

      if (!atualizado) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (e) {
      return res.status(500).json({ erro: "Falha ao atualizar usuário" });
    }
  },

  // DELETE /usuarios/:id
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const deletado = await usuarioModel.deletar(id);

      if (!deletado) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.status(200).json({ mensagem: "Deletado com sucesso" });
    } catch (e) {
      return res.status(500).json({ erro: "Falha ao deletar usuário" });
    }
  },
};
