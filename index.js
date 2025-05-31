const http = require('node:http')
const fs = require('node:fs')
const users  = require('./data/users')

const firstModel = (req, res) => {
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
}

const refactoredApiEndpoints = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.setHeader("content-type", "text/plain");
          res.end("Bienvenido a mi API con node.js");
          break;
        case "/users":
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(users));
          break;

        default:
          res.statusCode = 400;
          res.end("Invalid url: " + url);
      }
      break;
    case "POST":
      switch (url) {
        case "/add-user":
          let body = "";

          
          //event driven handlers
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const result = JSON.parse(body);
            console.log(result);
            res.end("post request successfull");
          });
          break;
        default:
          res.statusCode = 400;
          res.end("Invalid url: " + url);
      }
      break;

    default:
      res.statusCode = 400;
      res.end("Invalid http method: " + method);
  }
};

const server = http.createServer(refactoredApiEndpoints)

server.listen(1234, () => {
  console.log('Escuchando servidor en el puerto: http://localhost:' + server.address().port)
})
