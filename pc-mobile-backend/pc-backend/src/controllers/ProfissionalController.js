import Profissional from '../models/Profissional.js'

class ProfissionalController {
  static async buscarProfissionais(req, res) {
    const { q } = req.query

    try {
      let profissionais
      if (q) {
        const regex = new RegExp(q, 'i')
        profissionais = await Profissional.find({
          $or: [{ nome: regex }, { especializacao: regex }],
        })
      } else {
        profissionais = await Profissional.find()
      }

      res.status(200).json(profissionais)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Erro ao listar profissionais.` })
    }
  }

  static async buscarProfissionalPorId(req, res) {
    try {
      const { id } = req.params
      const profissionalEncontrado = await Profissional.findById(id)
      res.status(200).json(profissionalEncontrado)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async atualizarProfissional(req, res) {
    try {
      const { id } = req.params
      await Profissional.findByIdAndUpdate(id, req.body)
      res.status(200).json({ mensagem: 'Profissional atualizado com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async deletarProfissional(req, res) {
    try {
      const { id } = req.params
      await Profissional.findByIdAndDelete(id, req.body)
      res.status(200).json({ mensagem: 'Profissional excluído com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async criarProfissional(req, res) {
    try {
      const { nome, dataNascimento, email, senha, genero, especializacao } = req.body
  
      // Verifica se já existe um profissional com o mesmo email
      const profissionalExistente = await Profissional.findOne({ email })
      if (profissionalExistente) {
        return res.status(400).json({ mensagem: 'Já existe um profissional com esse email.' })
      }
  
      // Cria uma nova instância do profissional
      const novoProfissional = new Profissional({
        nome,
        dataNascimento,
        email,
        senha,
        genero,
        especializacao
      })
  
      // Salva o profissional no banco de dados
      await novoProfissional.save()
  
      // Retorna uma resposta de sucesso
      res.status(201).json({
        mensagem: 'Profissional criado com sucesso!',
        profissional: {
          nome: novoProfissional.nome,
          email: novoProfissional.email,
          especializacao: novoProfissional.especializacao,
        }
      })
    } catch (error) {
      // Retorna uma resposta de erro
      res.status(500).json({ mensagem: `${error.message} - Falha ao criar o profissional.` })
    }
  }
}

export default ProfissionalController
