import jwt from 'jsonwebtoken'
import Cliente from '../models/Cliente.js'
import Profissional from '../models/Profissional.js'
import FichaPerimetria from '../models/FichaPerimetria.js'

class AuthController {
  static async signinCliente(req, res) {
    const { email, senha } = req.body

    try {
      const cliente = await Cliente.findOne({ email })
      if (!cliente || !(await cliente.verificarSenha(senha))) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' })
      }

      const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, {
        expiresIn: '72h',
      })

      // eslint-disable-next-line no-unused-vars
      const { senha: _, ...dadosCliente } = cliente.toObject()

      res.status(200).json({ token, cliente: dadosCliente })
    } catch (error) {
      res.status(500).json({ mensagem: `${error.message} - Falha no login` })
    }
  }

  static async signupCliente(req, res) {
    try {
      const clienteCadastrado = await Cliente.create(req.body)

      const fichaPerimetriaCadastrada = await FichaPerimetria.create({
        altura: 0,
        peso: 0,
        dataAvaliacao: new Date(),
        objetivo: '',
        cliente: clienteCadastrado._id,
        circunferencias: {
          pescoco: 0,
          peitoral: 0,
          ombroDireito: 0,
          ombroEsquerdo: 0,
          bracoDireito: 0,
          bracoEsquerdo: 0,
          cintura: 0,
          abdomen: 0,
          quadril: 0,
          coxaDireita: 0,
          coxaEsquerda: 0,
          panturrilhaDireita: 0,
          panturrilhaEsquerda: 0,
        },
        indicadores: {
          fumante: false,
          diabetes: false,
          lesoes: false,
          dorNoPeito: false,
          perdaDeConsciencia: false,
        },
        observacoes: 'Nenhuma.',
      })

      res.status(201).json({
        mensagem: 'Cliente e ficha de perimetria cadastrados com sucesso.',
        cliente: clienteCadastrado,
        fichaPerimetria: fichaPerimetriaCadastrada,
      })
    } catch (error) {
      res.status(500).json({ mensagem: `${error.message} - Falha no cadastro` })
    }
  }

  static async signinProfissional(req, res) {
    const { email, senha } = req.body

    try {
      const profissional = await Profissional.findOne({ email })
      if (!profissional || !(await profissional.verificarSenha(senha))) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' })
      }

      const token = jwt.sign({ id: profissional._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.status(200).json({ token })
    } catch (error) {
      res.status(500).json({ mensagem: `${error.message} - Falha no login` })
    }
  }

  static async signupProfissional(req, res) {
    try {
      const profissionalCadastrado = await Profissional.create(req.body)
      res.status(201).json({
        mensagem: 'Profissional cadastrado com sucesso.',
        profissional: profissionalCadastrado,
      })
    } catch (error) {
      res.status(500).json({
        mensagem: `${error.message} - Falha no cadastro do profissional.`,
      })
    }
  }

  static async me(req, res) {
    try {
      let user = await Cliente.findById(req.userId).select('-senha')

      if (!user) {
        user = await Profissional.findById(req.userId).select('-senha')
      }

      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
      }

      res.status(200).json({ user })
    } catch (error) {
      res.status(500).json({
        mensagem: `${error.message} - Falha ao buscar usuário autenticado.`,
      })
    }
  }
}

export default AuthController
