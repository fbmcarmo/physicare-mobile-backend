import express from 'express'
import SolicitacaoClienteController from '../controllers/SolicitacaoClienteController.js'
import verificarToken from '../middlewares/authMiddleware.js'

const solicitacoesClienteRoutes = express.Router()

solicitacoesClienteRoutes
  .post(
    '/solicitacoes-cliente',
    // verificarToken,
    SolicitacaoClienteController.criarSolicitacao
  )
  .get(
    '/solicitacoes-cliente/minhas',
    verificarToken,
    SolicitacaoClienteController.getMinhasSolicitacoes
  )
  .put(
    '/solicitacoes-cliente/:id/cancelar',
    // verificarToken,
    SolicitacaoClienteController.cancelarSolicitacao
  )

export default solicitacoesClienteRoutes
