import Cliente from '../models/Cliente.js'

class ClienteController {
  static async buscarTodosClientes(req, res) {
    try {
      const clientesEncontrados = await Cliente.find({})
      res.status(200).json(clientesEncontrados)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async buscarClientePorId(req, res) {
    try {
      const { id } = req.params
      const clienteEncontrado = await Cliente.findById(id)
      res.status(200).json(clienteEncontrado)
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async atualizarCliente(req, res) {
    try {
      const { id } = req.params
      await Cliente.findByIdAndUpdate(id, req.body)
      res.status(200).json({ mensagem: 'Cliente atualizado com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async deletarCliente(req, res) {
    try {
      const { id } = req.params
      await Cliente.findByIdAndDelete(id, req.body)
      res.status(200).json({ mensagem: 'Cliente excluído com sucesso.' })
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: `${error.message} - Falha na requisição.` })
    }
  }

  static async criarCliente(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const { nome, dataNascimento, email, senha, genero } = req.body
  
      // Cria uma nova instância do cliente
      const novoCliente = new Cliente({
        nome,
        dataNascimento,
        email,
        senha,
        genero
      })
  
      // Salva o cliente no banco de dados
      await novoCliente.save()
  
      // Retorna uma resposta de sucesso
      res.status(201).json({ mensagem: 'Cliente criado com sucesso!', cliente: novoCliente })
    } catch (error) {
      // Retorna uma resposta de erro
      res.status(500).json({ mensagem: `${error.message} - Falha ao criar o cliente.` })
    }
  }
  
}

export default ClienteController
