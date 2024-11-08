import express from 'express'
import ProfissionalController from '../controllers/ProfissionalController.js'
// import verificarToken from '../middlewares/authMiddleware.js'

const profissionalRoutes = express.Router()

profissionalRoutes
  .get(
    '/profissionais',
    // verificarToken,
    ProfissionalController.buscarProfissionais
  )
  .get(
    '/profissionais/:id',
    // verificarToken,
    ProfissionalController.buscarProfissionalPorId
  )
  .put(
    '/profissionais/:id',
    // verificarToken,
    ProfissionalController.atualizarProfissional
  )
  .delete(
    '/profissionais/:id',
    // verificarToken,
    ProfissionalController.deletarProfissional
  )
  .post(
    '/profissionais/',
    // verificarToken,
    ProfissionalController.criarProfissional
  )
  

export default profissionalRoutes
