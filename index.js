const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  console.log('Enviando contenido')
  console.log(req.url)

  if (req.url === '/show-html') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.statusCode = 200
    res.end('<h1>Hola Mundo página con node.js</h1>')
  } else if (req.url === '/show-image.png') {
    res.setHeader('content-type', 'image/png')
    res.statusCode = '200'
    fs.readFile('./assets/dog.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('content-type', 'text/plain')
        res.end('Couldnt render the image')
      } else {
        res.statusCode = 200
        res.setHeader('content-type', 'image/png')
        res.end(data)
	  }
    })
  }
})

server.listen(1234, () => {
  console.log('Escuchando servidor en el puerto: http://localhost:' + server.address().port)
})
