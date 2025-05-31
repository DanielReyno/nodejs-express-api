const express = require('express')
const users = require('./data/users')
const app = express()

///own middleware body handler
const postMiddlewareHandler = (req, res, Next) => {
    if(req.method !== 'POST') return Next()
    if(req.headers['content-type'] !== 'application/json') return Next()
    
    let bodyContent = ''
    req.on('data', (chunk) => {
        bodyContent += chunk.toString()
    })

    req.on('end', () => {
        req.body = JSON.parse(bodyContent)
        Next()
    })
}

//Using built-in body handler Middleware
app.use(express.json())

app.disable("x-powered-by")
const port = 1234

///Main Endpoint
app.get("/", (req, res) => {
    res.status(200).end("<h1> Bienvenido a mi API con express.js")
})

///GET users
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

///POST user
app.post('/add-user', (req, res) => {
    console.log(req.body)
    res.status(201).end("post request success")
})

///Handle Unknown routes or methods
app.use((req, res) => {
    res.status(404).end('<h1>Unhandled Request</h1>')
})

app.listen(port,() => {
    console.log("Escuchando en el puerto http://localhost:"+port)
})