
//Importações
//const express = require("express"); //Iniciando o Express
import express from "express";
const router = express.Router(); //Configurando a primeira parte da 
//const cors = require('cors') //Trazendo o pacote Cors que permite consumir a API no front-end
import cors from 'cors' ////Trazendo o pacote Cors que permite consumir a API no front-end | Ajustando forma de importar o cors
//import { v4 as uuidv4 } from 'uuid'; //Biblioteca para criar id
//const conectaBancoDeDados = require('./bancoDeDados.js')
import conectaBancoDeDados from './bancoDeDados.js'
//const Livro = require('./livroModel.js')
import Livro from './livroModel.js'


conectaBancoDeDados()

const app = express() //Iniciando o app
app.use(express.json()) //usando o express
app.use(cors()) //usando o cors
const porta = 3333  //Criando a porta

//Criando array inicial de livros 
/*
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
*/

//Porta
function mostraPorta (){
    console.log("Servidor criado e rodando na porta", porta)
}

//Agora estou usando o javaScript assincrono 
//GET
 async function mostraLivros(request, response){
    try{
        const livrosGetsDoBanco = await Livro.find() //Abstração do BD
        response.json(livrosGetsDoBanco)
    }catch (erro){
        console.log(erro)
    }
    //response.json(livros)
 }

 //POST ANTIGO
 /*
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
*/

async function criaLivro(request, response){
    const novoLivro = new Livro ({
        nome: request.body.nome,
        quantPag:request.body.quantPag,
        imagem:request.body.imagem,
        resenha:request.body.resenha
    })
    //livros.push(novoLivro)
    //response.json(livros)

    try{
        const livrCriado = await novoLivro.save() //POST no banco MongoDB
        response.status(201).json(livrCriado)
    }catch (erro){
        console.log(erro)
    }
 }

 //PATCH ANTIGO
 /*
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
 */

 async function alteraLivro(request, response){
 
    try{
        const livroEncontrado = await Livro.findById(request.params.id)

        if(request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
    
        if(request.body.quantPag){
            livroEncontrado.quantPag = request.body.quantPag
        }
    
        if(request.body.imagem){
            livroEncontrado.imagem = request.body.imagem
        }
    
        if(request.body.resenha){
            livroEncontrado.resenha = request.body.resenha
        }

        const livroAtualizadaNoBD = await livroEncontrado.save()
        response.json(livroAtualizadaNoBD) //Livro atualizado
    }  
    catch (erro){
        console.log(erro)
    }
} 

//DELETE ANTIGO
/*
 function deletaLvro(request, response){
    function todosLivrosMenosEle(livro){
        if(livro.id !== request.params.id){
            return livro
        }
    }
    const livrosQueFicam = livros.filter(todosLivrosMenosEle) //Filtro - Exibe todos, menos o que foi deletado
    response.json(livrosQueFicam)
 }
*/ 
async  function deletaLvro(request, response){
   try{
        await Livro.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Livro deletado com sucesso!'})
   }catch(erro){
        console.log(erro)
   }

 }
 

app.use(router.get('/livros', mostraLivros)) // Configuração da segunda parte da rota //GET
app.use(router.post('/livros',criaLivro)) //Insere um novo livro via post //POST
app.use(router.patch('/livros/:id',alteraLivro)) //Altera o livro //PATCH
app.use(router.delete('/livros/:id',deletaLvro )) //Deleta o livro //DELETE
app.listen(porta, mostraPorta) // Servidor ouvindo a porta 3333
//mostraPorta()

 