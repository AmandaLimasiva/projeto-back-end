const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333 


const livros = [
    {
        nome: 'Harry Potter e a Pedra Filosofal ',
        quantPag: 512,
        imagem: 'https://www.skoob.com.br/livro/resenhas/967589/edicao:968559',
        resenha: 'Harry Potter nunca havia ouvido falar de Hogwarts quando as cartas começaram a aparecer no capacho da Rua dos Alfeneiros.'
    },
    {
        nome: 'O silêncio da casa fria',
        quantPag: 208,
        imagem: 'https://www.skoob.com.br/livro/resenhas/967589/edicao:968559',
        resenha: 'Quando Elsie perdeu o marido apenas algumas semanas após o casamento, achou que já tinha sofrido o suficiente para uma vida inteira.'
    },
    {
        nome: 'Alice no País das Maravilhas (Classic Edition)',
        quantPag: 552,
        imagem: 'https://www.imdb.com/pt/title/tt1014759/',
        resenha: 'Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar. Alice é despertada de um leve sono ao pé de uma árvore por um coelho peculiar. '
    }
]


function mostraPorta (){
    console.log("Servidor criado e rodando na porta", porta)
}


 function mostraLivros(request, response){
    response.json(livros)
 }


app.use(router.get('/livros', mostraLivros))
app.listen(porta, mostraPorta)
//mostraPorta()

 