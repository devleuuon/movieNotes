//server devolve p cliente. e devolve oq vem do 'app.use(routes)'
require('express-async-errors')
const database = require('./database/sqlite')
const appError = require('./utils/appError')
const express = require('express')
const routes = require('./routes') //importando routes. quando não passar a pasta que quer utilizar, por padrão vai encontrar o index.js

const app = express() //executando express
app.use(express.json()) //está executando no insomnia

app.use(routes) //executando routes

database() //executando banco de dados

app.use(( error, request, response, next) => {
    if(error instanceof appError) { //se o erro vem do cliente
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    return response.status(500).json({ //erro do servidor
        status: 'error',
        message: 'Internal server error'
    })
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})