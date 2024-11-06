import Solicitacao from '../models/Solicitacao.js'

class SolicitacaoProfissionalController {
  static async getSolicitacoes(req, res) {
    try {
      const profissionalId = req.user.id

      const solicitacoes = await Solicitacao.find({
        $or: [
          { tipoSolicitacao: 'aberta', status: 'Em Análise' },
          { tipoSolicitacao: 'fechada', profissional: profissionalId },
        ],
        status: { $ne: 'Cancelada' },
      })
        .populate('cliente', 'nome email')
        .exec()

      res.status(200).json(solicitacoes)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao buscar solicitações.` })
    }
  }

  static async aceitarSolicitacao(req, res) {
    try {
      const profissionalId = req.user.id
      const { id } = req.params

      const solicitacao = await Solicitacao.findById(id)

      if (!solicitacao) {
        return res.status(404).json({ mensagem: 'Solicitação não encontrada.' })
      }

      if (solicitacao.status !== 'Em Análise') {
        return res.status(400).json({
          mensagem: `Não é possível aceitar uma solicitação com status '${solicitacao.status}'.`,
        })
      }

      if (solicitacao.tipoSolicitacao === 'fechada') {
        if (solicitacao.profissional.toString() !== profissionalId) {
          return res.status(403).json({
            mensagem: 'Você não tem permissão para aceitar esta solicitação.',
          })
        }
      } else if (solicitacao.tipoSolicitacao === 'aberta') {
        solicitacao.profissional = profissionalId
      } else {
        return res
          .status(400)
          .json({ mensagem: 'Tipo de solicitação inválido.' })
      }

      solicitacao.status = 'Aceito'
      await solicitacao.save()

      res.status(200).json({
        mensagem: 'Solicitação aceita com sucesso.',
        solicitacao,
      })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao aceitar solicitação.` })
    }
  }

  static async recusarSolicitacao(req, res) {
    try {
      const profissionalId = req.user.id
      const { id } = req.params

      const solicitacao = await Solicitacao.findById(id)

      if (!solicitacao) {
        return res.status(404).json({ mensagem: 'Solicitação não encontrada.' })
      }

      if (solicitacao.status !== 'Em Análise') {
        return res.status(400).json({
          mensagem: `Não é possível recusar uma solicitação com status '${solicitacao.status}'.`,
        })
      }

      if (solicitacao.tipoSolicitacao === 'fechada') {
        if (solicitacao.profissional.toString() !== profissionalId) {
          return res.status(403).json({
            mensagem: 'Você não tem permissão para recusar esta solicitação.',
          })
        }
      } else if (solicitacao.tipoSolicitacao === 'aberta') {
        // Pensando em como fazer
      } else {
        return res
          .status(400)
          .json({ mensagem: 'Tipo de solicitação inválido.' })
      }

      solicitacao.status = 'Recusado'
      await solicitacao.save()

      res.status(200).json({
        mensagem: 'Solicitação recusada com sucesso.',
        solicitacao,
      })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao recusar solicitação.` })
    }
  }
}

export default SolicitacaoProfissionalController
