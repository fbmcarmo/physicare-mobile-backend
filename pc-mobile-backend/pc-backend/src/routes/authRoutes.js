import express from 'express'
import AuthController from '../controllers/AuthController.js'
import verificarToken from '../middlewares/authMiddleware.js'

const authRoutes = express.Router()

authRoutes.post('/signin-cliente', AuthController.signinCliente)
authRoutes.post('/signin-profissional', AuthController.signinProfissional)

authRoutes.post('/signup-cliente', AuthController.signupCliente)
authRoutes.post('/signup-profissional', AuthController.signupProfissional)

authRoutes.get('/me', verificarToken, AuthController.me)

export default authRoutes
