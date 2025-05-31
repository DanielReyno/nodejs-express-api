const express = require('express')
const users = require('./data/users')
const app = express()

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
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        console.log(JSON.parse(body))
        res.status(201).end("post request successfull")
    })
})

///Handle Unknown routes or methods
app.use((req, res) => {
    res.status(404).end('<h1>Unhandled Request</h1>')
})

app.listen(port,() => {
    console.log("Escuchando en el puerto http://localhost:"+port)
})