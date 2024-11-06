import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose

const ClienteSchema = new Schema(
  {
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    genero: {
      type: String,
      enum: ['masculino', 'feminino', 'outros'],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
  },
  { versionKey: false }
)

ClienteSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10)
  }
  next()
})

ClienteSchema.methods.verificarSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha)
}

const Cliente = mongoose.model('Cliente', ClienteSchema)

export default Cliente
