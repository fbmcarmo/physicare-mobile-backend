import mongoose from 'mongoose'

async function conectarComBD() {
  mongoose.connect(process.env.DB_CONNECTION_STRING)
  return mongoose.connection
}

export default conectarComBD
