import mongoose from 'mongoose'
const { Schema } = mongoose

const FichaPerimetriaSchema = new Schema(
  {
    altura: { type: Number, required: true },
    peso: { type: Number, required: true },
    dataAvaliacao: { type: Date, required: true },
    objetivo: { type: String },
    circunferencias: {
      pescoco: { type: Number },
      peitoral: { type: Number },
      ombroDireito: { type: Number },
      ombroEsquerdo: { type: Number },
      bracoDireito: { type: Number },
      bracoEsquerdo: { type: Number },
      cintura: { type: Number },
      abdomen: { type: Number },
      quadril: { type: Number },
      coxaDireita: { type: Number },
      coxaEsquerda: { type: Number },
      panturrilhaDireita: { type: Number },
      panturrilhaEsquerda: { type: Number },
    },
    indicadores: {
      fumante: { type: Boolean },
      diabetes: { type: Boolean },
      lesoes: { type: Boolean },
      dorNoPeito: { type: Boolean },
      perdaDeConsciencia: { type: Boolean },
    },
    observacoes: { type: String },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  },
  { versionKey: false }
)

const FichaPerimetria = mongoose.model('FichaPerimetria', FichaPerimetriaSchema)

export default FichaPerimetria
