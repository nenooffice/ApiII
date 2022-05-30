import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Paleta from '../models/paletas.model';
import Usuario from '../models/usuarios.model';


const verificarDadosDePaletaMiddleware = (request, response, next) => {
  const { sabor, descricao, foto, preco } = request.body;

  if (!sabor || !descricao || !foto || !preco) {
    return response.status(422).send('Dados incompletos');
  }

  next();
};

const verificarDadosDoUsuarioMiddleware = (request, response, next) => {
  const { email, nome, senha } = request.body;

  if (!email || !nome || !senha) {
    return response.status(422).send('Dados incompletos');
  }

  next();
};

const verificarIdDePaletaMiddleware = async (request, response, next) => {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ message: 'ID inválido!' });
  }

  const paleta = await Paleta.findById(id);

  if (!paleta) {
    return response.status(404).send('Paleta não encontrada!');
  }

  next();
};

const verificarIdDoUsuarioMiddleware = async (request, response, next) => {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ message: 'ID inválido!' });
  }

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return response.status(404).send('Usuario não encontrado!');
  }

  next();
};

const verificarTokenMiddleware = (request, response, next) => {
  const token = request.headers.authorization;

  if (token === undefined) {
    return response.status(401).send('Token não enviado');
  }

  jwt.verify(token, 'chave_secreta', (error, decoded) => {
    if (error) {
      return response.status(401).send('Token inválido');
    }

    next();
  });
};

export default { 
  verificarDadosDePaletaMiddleware,
  verificarDadosDoUsuarioMiddleware,
  verificarIdDePaletaMiddleware,
  verificarIdDoUsuarioMiddleware,
  verificarTokenMiddleware
};
