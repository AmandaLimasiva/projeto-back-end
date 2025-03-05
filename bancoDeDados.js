const mongoose = require('mongoose')
require('dotenv').config() //Importando o .env



async function conectaBancoDeDados() {

    try {

        console.log('Conexão com o banco de dados iniciou')

        await mongoose.connect(process.env.MONGO_URL) //Protegendo os dados do banco

        console.log('Conexão com o banco de dados feita com sucesso!')

    } catch(erro) {

        console.log(erro)

    }

}



module.exports = conectaBancoDeDados