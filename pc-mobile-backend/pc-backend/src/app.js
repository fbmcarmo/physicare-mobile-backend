import express from 'express'
import conectarComBD from './config/dbConnect.js'
import routes from './routes/index.js'

const connection = await conectarComBD()

connection.on('error', (error) => {
  console.error('Erro na conexão do Banco: ', error)
})

connection.once('open', () =>
  console.log('Conexão com o Banco de Dados feita com sucesso.')
)

const app = express()
routes(app)

export default app
