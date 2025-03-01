const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333 


function mostraPorta (){
    console.log("Servidor criado e rodando na porta", porta)
}


function mostraLivro(request, response){
    response.json({
        nome: 'O silêncio da casa fria',
        quantPag: 283,
        imagem: 'https://www.skoob.com.br/livro/resenhas/967589/edicao:968559',
        resenha: 'Quando Elsie perdeu o marido apenas algumas semanas após o casamento, achou que já tinha sofrido o suficiente para uma vida inteira.'
    })
}



app.use(router.get('/livro', mostraLivro))
app.listen(porta, mostraPorta)
//mostraPorta()

 