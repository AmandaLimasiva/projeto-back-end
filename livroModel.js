const mongoose = require('mongoose')


const LivroShema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    quantPag:{
        type: Number,
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
    },
     dataInicio:{
        type: String,
        required: true
    },
    dataTermino:{
        type: String,
        required: true
    },
    notaLeitura:{
        type: Number,
        required: false
    }
   
})

module.exports = mongoose.model('divo', LivroShema)