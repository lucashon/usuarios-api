const express = require('express')
const router = express.Router()
const {randomUUID} = require('crypto')

const path = require('path')
const basePath = path.join(__dirname, '../templates')

const array = []

router.use(express.json());

// router.get('/cadastrar.html', (req, res) => {
//     res.sendFile(`${basePath}/cadastrar.html`)
// })

//Cadastrar usuário
router.post('/cadastrar', (req, res) => {
    const {name, email, age } = req.body

    const produto = {
        id: randomUUID(),
        name, 
        email,
        age,
    }

    array.push(produto)
    console.log(array)
    return res.json(produto)
    //res.sendFile(`${basePath}/cadastrar.html`)
})

router.get('/cadastrar', (req,res)=>{
    return res.json(array)
})

router.delete('/produtos/:id', (req, res)=>{
    const {id} = req.params

    const produto = array.findIndex((produto) => produto.id === id)

    array.splice(produto, 1)
     return res.json({'message': 'Produto deletado com sucesso.'})
})

//ATUALIZAR
router.put('/produtos/:id', (req,res)=>{
    const {id} = req.params
    const {name, email, age} = req.body
    const produtoIndex = array.findIndex((produto) => produto.id === id)

    if(produtoIndex === -1){
        return res.status(404).json({message: "Usuario não encontrado"})
    }
    const produtoAtualizado = {
        id,
        name,
        email,
        age
    }
    array[produtoIndex] = produtoAtualizado;
    return res.json(produtoAtualizado);

})


router.get('/visualizar.html', (req, res) => {
    res.sendFile(`${basePath}/visualizar.html`)
})
module.exports = router