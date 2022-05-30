import PaletasServices from '../services/paletas.services';

const paletasServices = new PaletasServices();

class PaletasControllers {
  async listarTodas(request, response) {
    try {
      const paletas = await paletasServices.listarTodas();

      response.send(paletas);
    } catch (error) {
      response.status(error.status).send(error.message);
    }
  }

  async listarUmaPaletaPorId(request, response) {
    const id = request.params.id;

    const paleta = await paletasServices.listarUmaPaletaPorId({ id });

    response.send(paleta);
  }

  async criarNovaPaleta(request, response) {
    const { sabor, descricao, foto, preco } = request.body;

    try {
      const novaPaleta = await paletasServices.criarNovaPaleta({
        sabor,
        descricao,
        preco,
        foto,
      });

      response.status(201).send(novaPaleta);
    } catch (error) {
      if (error.code === 11000) {
        response.status(400).send('Sabor já cadastrado');
      }
    }
  }

  async atualizarPaleta(request, response) {
    const { sabor, descricao, foto, preco } = request.body;
    const id = request.params.id;

    try {
      const paletaAtualizada = await paletasServices.atualizarPaleta({
        sabor,
        descricao,
        foto,
        preco,
        id,
      });

      response.send(paletaAtualizada);
    } catch (error) {
      if (error.code === 11000) {
        response.status(400).send('Sabor já cadastrado');
      }
    }
  }

  async excluirPaleta(request, response) {
    const id = request.params.id;

    const paleta = await paletasServices.excluirPaleta({ id });

    response.status(200).send(paleta);
  }
}

export default PaletasControllers;