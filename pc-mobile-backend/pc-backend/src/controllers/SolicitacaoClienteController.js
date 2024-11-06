import Solicitacao from '../models/Solicitacao.js'
import Profissional from '../models/Profissional.js'

class SolicitacaoClienteController {
  static async criarSolicitacao(req, res) {
    try {
      const { tipoSolicitacao, titulo, descricao, profissional, cliente } =
        req.body
      const clienteId = cliente

      if (!tipoSolicitacao || !titulo || !descricao) {
        return res
          .status(400)
          .json({ mensagem: 'Campos obrigatórios não fornecidos.' })
      }

      if (!['aberta', 'fechada'].includes(tipoSolicitacao)) {
        return res
          .status(400)
          .json({ mensagem: 'Tipo de solicitação inválido.' })
      }

      let profissionalId = null
      if (tipoSolicitacao === 'fechada') {
        if (!profissional) {
          return res.status(400).json({
            mensagem:
              'Profissional deve ser fornecido para solicitações fechadas.',
          })
        }
        profissionalId = profissional

        const profissionalExiste = await Profissional.findById(profissionalId)
        if (!profissionalExiste) {
          return res
            .status(404)
            .json({ mensagem: 'Profissional não encontrado.' })
        }
      }

      const novaSolicitacao = new Solicitacao({
        tipoSolicitacao,
        titulo,
        descricao,
        cliente: clienteId,
        profissional: profissionalId,
      })

      await novaSolicitacao.save()

      res.status(201).json({
        mensagem: 'Solicitação criada com sucesso.',
        solicitacao: novaSolicitacao,
      })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao criar solicitação.` })
    }
  }

  static async getMinhasSolicitacoes(req, res) {
    try {
      const clienteId = req.userId

      const solicitacoes = await Solicitacao.find({ cliente: clienteId })
        .populate('profissional', 'nome email')
        .exec()

      res.status(200).json(solicitacoes)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao buscar solicitações.` })
    }
  }

  static async cancelarSolicitacao(req, res) {
    try {
      const clienteId = req.body.cliente
      const { id } = req.params

      const solicitacao = await Solicitacao.findById(id)

      if (!solicitacao) {
        return res.status(404).json({ mensagem: 'Solicitação não encontrada.' })
      }

      if (solicitacao.cliente.toString() !== clienteId) {
        return res.status(403).json({
          mensagem: 'Você não tem permissão para cancelar esta solicitação.',
        })
      }

      if (['Cancelada', 'Aceito', 'Recusado'].includes(solicitacao.status)) {
        return res.status(400).json({
          mensagem: `Não é possível cancelar uma solicitação com status '${solicitacao.status}'.`,
        })
      }

      solicitacao.status = 'Cancelada'
      await solicitacao.save()

      res.status(200).json({
        mensagem: 'Solicitação cancelada com sucesso.',
        solicitacao,
      })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha ao cancelar solicitação.` })
    }
  }
}

export default SolicitacaoClienteController
