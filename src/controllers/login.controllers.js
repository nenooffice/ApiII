import LoginServices from '../services/login.services';

const loginServices = new LoginServices();

class LoginControllers {
  async realizarLogin(request, response) {

    const { email, senha } = request.body;

    const login = await loginServices.realizarLogin({ email, senha });

    if (login.status === 400) {
      return response.status(login.status).send(login.mensagem);
    }

    response.status(login.status).send({ token: login.token });
  }
}

export default LoginControllers;