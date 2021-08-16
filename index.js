
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./rutas/api.route');

app.use(bodyParser.json());

const server = app.listen(8080, () =>{
    console.log('Escuchando en el puerto 8080.');
});

app.use('/api', api);
