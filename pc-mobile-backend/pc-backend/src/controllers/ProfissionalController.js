import Profissional from '../models/Profissional.js'

class ProfissionalController {
  static async buscarProfissionais(req, res) {
    const { q } = req.query

    try {
      let profissionais
      if (q) {
        const regex = new RegExp(q, 'i')
        profissionais = await Profissional.find({
          $or: [{ nome: regex }, { especializacao: regex }],
        })
      } else {
        profissionais = await Profissional.find()
      }

      res.status(200).json(profissionais)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Erro ao listar profissionais.` })
    }
  }

  static async buscarProfissionalPorId(req, res) {
    try {
      const { id } = req.params
      const profissionalEncontrado = await Profissional.findById(id)
      res.status(200).json(profissionalEncontrado)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async atualizarProfissional(req, res) {
    try {
      const { id } = req.params
      await Profissional.findByIdAndUpdate(id, req.body)
      res.status(200).json({ mensagem: 'Profissional atualizado com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async deletarProfissional(req, res) {
    try {
      const { id } = req.params
      await Profissional.findByIdAndDelete(id, req.body)
      res.status(200).json({ mensagem: 'Profissional excluído com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }
}

export default ProfissionalController
