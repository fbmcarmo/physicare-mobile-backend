import express from 'express'
import FichaPerimetriaController from '../controllers/FichaPerimetriaController.js'
import verificarToken from '../middlewares/authMiddleware.js'

const fichaPerimetriaRoutes = express.Router()

fichaPerimetriaRoutes
  .get(
    '/minha-ficha-perimetria',
    verificarToken,
    FichaPerimetriaController.buscarMinhaFichaPerimetria
  )
  .put(
    '/minha-ficha-perimetria',
    verificarToken,
    FichaPerimetriaController.atualizarMinhaFichaPerimetria
  )

export default fichaPerimetriaRoutes
