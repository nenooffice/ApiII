import Usuario from '../models/usuarios.model';
import bcryptjs from 'bcryptjs';

class UsuariosServices {
  async listarTodos() {
    const usuarios = await Usuario.find();

    return usuarios;
  }

  async listarPorId({ id }) {
    const usuario = await Usuario.findById(id);

    return usuario;
  }

  async criarNovoUsuario({ email, nome, senha, adm }) {
    const senhaCriptografada = await bcryptjs.hash(senha, 8);

    const novoUsuario = {
      email,
      nome,
      senha: senhaCriptografada,
      adm,
    };

    try {
      const usuario = await Usuario.create(novoUsuario);

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async atualizarUsuario({ id, email, nome, senha, adm }) {
    const usuarioAtualizado = {
      email,
      nome,
      senha,
      adm,
    };

    try {
      await Usuario.updateOne({ _id: id }, usuarioAtualizado);

      const usuario = await Usuario.findById(id);

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async excluirUsuario({ id }) {
    await Usuario.findByIdAndDelete(id);
  }
}

export default UsuariosServices;
