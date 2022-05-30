import Paleta from '../models/paletas.model';

class PaletasServices {
  async listarTodas() {
    const paletas = await Paleta.find();

    if (paletas.length === 0) {
      throw { status: 404, message: 'Nenhuma paleta encontrada' };
    }

    return paletas;
  }

  async listarUmaPaletaPorId({ id }) {
    const paletaSelecionada = await Paleta.findById(id);

    return paletaSelecionada;
  }

  async criarNovaPaleta({ sabor, descricao, foto, preco }) {
    const novaPaleta = {
      sabor,
      descricao,
      foto,
      preco,
    };

    try {
      const paleta = await Paleta.create(novaPaleta);

      return paleta;
    } catch (error) {
      throw error;
    }
  }

  async atualizarPaleta({ sabor, descricao, foto, preco, id }) {
    const paletaAtualizada = {
      sabor,
      descricao,
      foto,
      preco,
    };

    try {
      await Paleta.updateOne({ _id: id }, paletaAtualizada);

      const paleta = await Paleta.findById(id);

      return paleta;
    } catch (error) {
      throw error;
    }
  }

  async excluirPaleta({ id }) {
    const paleta = await Paleta.findByIdAndDelete(id);

    return paleta;
  }
}

export default PaletasServices;