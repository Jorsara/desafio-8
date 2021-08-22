
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./rutas/api.route');
const handlebars = require('express-handlebars');

const server = app.listen(8080, () =>{
    console.log('Escuchando en el puerto 8080.');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de pug
app.set('view engine', 'pug');
app.set('views', './views');

// Establecer ruta /api
app.use('/api', api);

