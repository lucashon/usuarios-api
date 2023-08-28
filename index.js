const express = require('express')
const app = express()

const door = 3333

const path = require('path')
const basePath = path.join(__dirname, 'templates')

//Importar a rota
const users = require('./users')

// MIDDLEWARE é o cara do meio de campo, com ele eu trato
// Arquivos Estaticos -> CSS IMG VIDEOS JS
app.use(express.static('public')) 

//Middleware para json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


app.listen(door, ()=>{
    console.log(`Rodando na porta ${door}`)
})