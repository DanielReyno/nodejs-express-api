const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('Enviando contenido')
  console.log(req.url)

  if (req.url === '/show-html') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.statusCode = '200'
    res.end('<h1>Hola Mundo página con node.js</h1>')
  }
})

server.listen(1234, () => {
  console.log('Escuchando servidor en el puerto: http://localhost:' + server.address().port)
})
