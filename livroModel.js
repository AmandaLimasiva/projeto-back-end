const mongoose = require('mongoose')


const LivroShema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    quantPag:{
        type: String,
        required: true
    },
    imagem:{
        type: String,
        required: true
    },
    resenha:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model('divo', LivroShema)