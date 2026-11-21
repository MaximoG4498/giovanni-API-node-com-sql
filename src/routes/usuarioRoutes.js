import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", usuarioController.criar);
router.get("/usuarios", usuarioController.listar);
router.put("/usuarios/:id", usuarioController.atualizar);
router.delete("/usuarios/:id", usuarioController.deletar);

export default router;
