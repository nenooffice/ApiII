import { Router } from 'express';
import UsuariosControllers from '../controllers/usuarios.controllers';
import { verificarDadosDoUsuarioMiddleware, verificarIdDoUsuario, verificarTokenMiddleware } from '../middlewares/verify.middlewares';

const usuariosRouter = Router();
const usuariosControllers = new UsuariosControllers();

usuariosRouter.get('', usuariosControllers.listarTodos);
usuariosRouter.get(
  '/:id',
  verificarIdDoUsuario,
  usuariosControllers.listarPorId,
);
usuariosRouter.post(
  '/criar-usuario',
  verificarDadosDoUsuarioMiddleware,
  usuariosControllers.criarNovoUsuario,
);
usuariosRouter.put(
  '/atualizar-usuario/:id',
  verificarTokenMiddleware,
  verificarIdDoUsuario,
  verificarDadosDoUsuarioMiddleware,
  usuariosControllers.atualizarUsuario,
);
usuariosRouter.delete(
  '/excluir-usuario/:id',
  verificarTokenMiddleware,
  verificarIdDoUsuario,
  usuariosControllers.excluirUsuario,
);

export default usuariosRouter;