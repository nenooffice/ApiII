
import Usuario from '../models/usuarios.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginServices {

  async realizarLogin({ email, senha }) {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return { status: 400, mensagem: 'Email incorreto' };
    }

    const senhaValida = await bcryptjs.compare(senha, usuario.senha);

    if (senhaValida === false) {
      return { status: 400, mensagem: 'Senha incorreta' };
    }

    const token = jwt.sign({ email: email }, 'chave_secreta', {
      expiresIn: '24h',
    });

    return { status: 200, token: token };
  }
}

export default LoginServices;