import express from 'express'
import ClienteController from '../controllers/ClienteController.js'
// import verificarToken from '../middlewares/authMiddleware.js'

const clienteRoutes = express.Router()

clienteRoutes
  .get('/clientes', ClienteController.buscarTodosClientes)
  .get('/clientes/:id', ClienteController.buscarClientePorId)
  .put('/clientes/:id', ClienteController.atualizarCliente)
  .delete('/clientes/:id', ClienteController.deletarCliente)

export default clienteRoutes
