import mongoose from 'mongoose'
const { Schema } = mongoose

const SolicitacaoSchema = new Schema(
  {
    dataSolicitacao: { type: Date, default: Date.now },
    tipoSolicitacao: {
      type: String,
      enum: ['aberta', 'fechada'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Aceito', 'Recusado', 'Em Análise', 'Cancelado'],
      default: 'Em Análise',
    },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    profissional: { type: Schema.Types.ObjectId, ref: 'Profissional' },
  },
  { versionKey: false }
)

const Solicitacao = mongoose.model('Solicitacao', SolicitacaoSchema)

export default Solicitacao
