//const express = require("express"); //Iniciando o Express
import express from "express";
const router = express.Router(); //Configurando a primeira parte da rota
import { v4 as uuidv4 } from 'uuid'; //Biblioteca para criar id


const app = express() //Iniciando o app
app.use(express.json())
const porta = 3333  //Criando a porta

//Criando array inicial de livros
const livros = [
    {
        id:'1',
        nome: 'Harry Potter e a Pedra Filosofal ',
        quantPag: 512,
        imagem: 'https://www.skoob.com.br/livro/resenhas/967589/edicao:968559',
        resenha: 'Harry Potter nunca havia ouvido falar de Hogwarts quando as cartas começaram a aparecer no capacho da Rua dos Alfeneiros.'
    },
    {
        id:'2',
        nome: 'O silêncio da casa fria',
        quantPag: 208,
        imagem: 'https://www.skoob.com.br/livro/resenhas/967589/edicao:968559',
        resenha: 'Quando Elsie perdeu o marido apenas algumas semanas após o casamento, achou que já tinha sofrido o suficiente para uma vida inteira.'
    },
    {
        id:'3',
        nome: 'Alice no País das Maravilhas (Classic Edition)',
        quantPag: 552,
        imagem: 'https://www.imdb.com/pt/title/tt1014759/',
        resenha: 'Uma menina, um coelho e uma história capazes de fazer qualquer um de nós voltar a sonhar. Alice é despertada de um leve sono ao pé de uma árvore por um coelho peculiar. '
    },
    {
        id:'4',
        nome: 'Astronomia',
        quantPag: 552,
        imagem: 'https://www.imdb.com/pt/title/tt1014759/',
        resenha: 'Amo Astronomia'
    }
]


//Porta
function mostraPorta (){
    console.log("Servidor criado e rodando na porta", porta)
}

//GET
 function mostraLivros(request, response){
    response.json(livros)
 }

 //POST
 function criaLivro(request, response){
    const novoLivro = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem:request.body.imagem,
        resenha:request.body.resenha
    }

    livros.push(novoLivro)

    response.json(livros)
 }

 //PATCH
 function alteraLivro(request, response){
    function localizaLivro(livro){ //encontra os livros pelo Id
        if(livro.id === request.params.id){
            return livro
        }
    }

    const livroLocalizado = livros.find(localizaLivro)

    if(request.body.nome){
        livroLocalizado.nome = request.body.nome
    }

    if(request.body.quantPag){
        livroLocalizado.quantPag = request.body.quantPag
    }

    if(request.body.imagem){
        livroLocalizado.imagem = request.body.imagem
    }

    if(request.body.resenha){
        livroLocalizado.resenha = request.body.resenha
    }

    response.json(livros) //Lista é enviada atualizada
 }

 //DELETE

 function deletaLvro(request, response){
    function todosLivrosMenosEle(livro){
        if(livro.id !== request.params.id){
            return livro
        }
    }

    const livrosQueFicam = livros.filter(todosLivrosMenosEle) //Filtro - Exibe todos, menos o que foi deletado


    response.json(livrosQueFicam)
 }
 

app.use(router.get('/livros', mostraLivros)) // Configuração da segunda parte da rota //GET
app.use(router.post('/livros',criaLivro)) //Insere um novo livro via post //POST
app.use(router.patch('/livros/:id',alteraLivro)) //Altera o livro //PATCH
app.use(router.delete('/livros/:id',deletaLvro )) //Deleta o livro //DELETE
app.listen(porta, mostraPorta) // Servidor ouvindo a porta 3333
//mostraPorta()

 