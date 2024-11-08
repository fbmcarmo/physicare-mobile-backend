import mongoose from 'mongoose'

async function conectarComBD() {
  console.log(process.env.DB_CONNECTION_STRING);
  mongoose.connect(process.env.DB_CONNECTION_STRING)
  return mongoose.connection
}

export default conectarComBD
