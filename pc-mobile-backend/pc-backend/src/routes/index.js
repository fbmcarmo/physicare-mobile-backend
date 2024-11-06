import express from 'express'
import clienteRoutes from './clienteRoutes.js'
import fichaPerimetriaRoutes from './fichaPerimetriaRoutes.js'
import profissionalRoutes from './profissionalRoutes.js'
import authRoutes from './authRoutes.js'
import solicitacoesClienteRoutes from './solicitacaoClienteRoutes.js'

const routes = (app) => {
  app
    .route('/')
    .get((req, res) =>
      res.status(200).send({ titulo: 'Bem-vindo ao Physicare!' })
    )

  app.use(
    express.json(),
    authRoutes,
    clienteRoutes,
    fichaPerimetriaRoutes,
    profissionalRoutes,
    solicitacoesClienteRoutes
  )
}

export default routes
