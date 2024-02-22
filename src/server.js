//server devolve p cliente. e devolve oq vem do 'app.use(routes)'

const express = require('express')
const routes = require('./routes') //importando routes. quando não passar a pasta que quer utilizar, por padrão vai encontrar o index.js

const app = express() //executando express
app.use(express.json())
app.use(routes) //executando routes


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})