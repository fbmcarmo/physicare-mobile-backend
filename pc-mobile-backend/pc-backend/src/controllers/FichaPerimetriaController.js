import FichaPerimetria from '../models/FichaPerimetria.js'

class FichaPerimetriaController {
  static async buscarMinhaFichaPerimetria(req, res) {
    try {
      const fichaPerimetria = await FichaPerimetria.findOne({
        cliente: req.userId,
      }).populate('cliente')

      if (!fichaPerimetria) {
        return res
          .status(404)
          .json({ mensagem: 'Ficha de Perimetria não encontrada' })
      }

      res.status(200).json(fichaPerimetria)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao buscar ficha` })
    }
  }

  static async atualizarMinhaFichaPerimetria(req, res) {
    try {
      const fichaAtualizada = await FichaPerimetria.findOneAndUpdate(
        { cliente: req.userId },
        req.body,
        { new: true }
      )

      if (!fichaAtualizada) {
        return res
          .status(404)
          .json({ mensagem: 'Ficha de Perimetria não encontrada' })
      }

      res.status(200).json({
        mensagem: 'Ficha de Perimetria atualizada com sucesso.',
        fichaPerimetria: fichaAtualizada,
      })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na atualização da ficha` })
    }
  }
}

export default FichaPerimetriaController
