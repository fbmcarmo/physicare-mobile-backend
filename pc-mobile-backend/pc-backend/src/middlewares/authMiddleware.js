import jwt from 'jsonwebtoken'

function verificarToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) return res.status(403).json({ mensagem: 'Token não fornecido.' })

  const tokenLimpo = token.split(' ')[1]

  jwt.verify(tokenLimpo, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ mensagem: 'Falha na autenticação.' })

    req.userId = decoded.id
    next()
  })
}

export default verificarToken
