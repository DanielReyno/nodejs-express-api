const express = require('express')
const users_data = require('./data/users')
const {validateUser, updateUser} = require('./schemas/user_schema')
const app = express()

app.disable('x-powered-by')
const port = 1234

app.use(express.json())


app.get('/users', (req, res) => {
    res.json(users_data)
})

app.get('/users/:name', (req, res) => {
    const {name} = req.params
    const findUser = users_data.find((user) => user.name.toLowerCase() === name.toLocaleLowerCase())
    res.json(findUser)
})

app.post('/users', (req, res) => {
    const validationResult = validateUser(req.body)
    if(validationResult.error) return res.status(400).end(validationResult.error.message)

    const newUserId = users_data.length +1
 
    

    const finalBody = {
        id: newUserId,
        ...validationResult.data
    }

    users_data.push(finalBody)
    res.json(finalBody)
})

app.patch('/users/:id', (req, res) => {
    const {id} =  req.params
    const userIndex = users_data.findIndex((user) => user.id === parseInt(id))

    
    if(userIndex === -1) return res.status(400).end("Couldn't find a user with the id= "+id)

    const validatedBody = updateUser(req.body)
    if(validatedBody.error) return res.status(400).end(validatedBody.error.message)
    
    const finalBody = {
        ...users_data[userIndex],
        ...validatedBody.data
    }
    users_data[userIndex] = finalBody
    res.json(finalBody)
})

app.delete("/users/:id", (req, res) => {
    const {id} = req.params
    const userIndex = users_data.findIndex((user) => user.id === parseInt(id))

    if(userIndex === -1) return res.status(400).end("Couldn't delete the user with the id: "+id)


    users_data.splice(userIndex,1)
    res.json({message: 'Data successfullt removed'})
})

app.listen(port, (req, res) => {
    console.log("Escuchando en el puerto http://localhost:"+port)
})