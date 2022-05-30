import UsuariosServices from '../services/usuarios.services';

const usuariosServices = new UsuariosServices();

class UsuariosControllers {
  async listarTodos(request, response) {
    const usuarios = await usuariosServices.listarTodos();

    response.send(usuarios);
  }

  async listarPorId(request, response) {
    const id = request.params.id;

    const usuario = await usuariosServices.listarPorId({ id });

    response.send(usuario);
  }

  async criarNovoUsuario(request, response) {
    // const email = request.body.email;
    // const nome = request.body.nome;
    // const senha = request.body.senha;
    // const adm = request.body.adm;

    // /\  Mesma coisa da linha de baixo \/

    const { email, nome, senha, adm } = request.body;

    try {
      const usuario = await usuariosServices.criarNovoUsuario({
        email,
        nome,
        senha,
        adm,
      });

      response.status(201).send(usuario);
    } catch (error) {
      if (error.code === 11000) {
        response.status(400).send('Email já cadastrado');
      }
    }
  }

  async atualizarUsuario(request, response) {
    const id = request.params.id;
    const { email, nome, senha, adm } = request.body;

    try {
      const usuarioAtualizado = await usuariosServices.atualizarUsuario({
        id,
        email,
        nome,
        senha,
        adm,
      });

      response.send(usuarioAtualizado);
    } catch (error) {
      if (error.code === 11000) {
        response.status(400).send('Email já cadastrado');
      }
    }
  }

  async excluirUsuario(request, response) {
    const id = request.params.id;

    await usuariosServices.excluirUsuario({ id });

    response.sendStatus(204);
  }
}

export default UsuariosControllers;