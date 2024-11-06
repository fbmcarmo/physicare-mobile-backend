import express from 'express'
import SolicitacaoController from '../controllers/SolicitacaoProfissionalController.js'
// import verificarToken from '../middlewares/authMiddleware.js'

const solicitacoesProfissionalRoutes = express.Router()

solicitacoesProfissionalRoutes
  .get(
    '/solicitacoes-profissional',
    // verificarToken,
    SolicitacaoController.getSolicitacoes
  )
  .put(
    '/solicitacoes-profissional/:id/aceitar',
    // verificarToken,
    SolicitacaoController.aceitarSolicitacao
  )
  .put(
    '/solicitacoes-profissional/:id/recusar',
    // verificarToken,
    SolicitacaoController.recusarSolicitacao
  )

export default solicitacoesProfissionalRoutes
