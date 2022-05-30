import LoginServices from '../services/login.services';

const loginServices = new LoginServices();

class LoginControllers {
  async realizarLogin(request, response) {
    // Pegamos o email e senha do corpo da requisição
    const { email, senha } = request.body;
    // const email = request.body.email
    // const senha = request.body.senha

    // Chamamos o serviço de login
    const login = await loginServices.realizarLogin({ email, senha });

    // Retornamos a resposta dinâmicamente, dependendo do que acontecer na requisição
    // Se o status for 400, retornamos a mensagem de erro
    if (login.status === 400) {
      return response.status(login.status).send(login.mensagem);
    }

    // Caso contrario, retornamos o token
    response.status(login.status).send({ token: login.token });
  }
}

export default LoginControllers;