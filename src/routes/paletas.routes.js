import { Router } from 'express';
import PaletasControllers from '../controllers/paletas.controllers';
import { verificarIdDePaletaMiddleware, verificarDadosDePaletaMiddleware } from '../middlewares/verify.middlewares';


const paletasRouter = Router();
const paletasControllers = new PaletasControllers();

paletasRouter.get('/listar-todas', paletasControllers.listarTodas);
paletasRouter.get(
  '/paleta/:id',
  verificarIdDePaletaMiddleware,
  paletasControllers.listarUmaPaletaPorId,
);
paletasRouter.post(
  '/criar-paleta',
  verificarDadosDePaletaMiddleware,
  paletasControllers.criarNovaPaleta,
);
paletasRouter.put(
  '/atualizar-paleta/:id',
  verificarIdDePaletaMiddleware,
  verificarDadosDePaletaMiddleware,
  paletasControllers.atualizarPaleta,
);
paletasRouter.delete(
  '/excluir-paleta/:id',
  verificarIdDePaletaMiddleware,
  paletasControllers.excluirPaleta,
);

export default paletasRouter;