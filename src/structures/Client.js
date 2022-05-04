const { Client } = require('discord.js')
const { connect } = require('mongoose')

//const Models = require('../database/models/Models')

//const erelaManager = require('./Manager')


module.exports = class extends Client {
    constructor(options) {
        super(options)
        //this.manager = erelaManager(this)
    }


    async connectToDatabase() {
        const connection = connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log('Database conectada com sucesso!')

        this.db = { connection }
    }



}


