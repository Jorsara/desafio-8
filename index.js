
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const server = app.listen(8080, () =>{
    console.log('Escuchando en el puerto 8080.');
});

app.get('/api/productos/listar', async (req, res)=>{    
    try {
        const data = await fs.promises.readFile('./productos.json');
        const json = JSON.parse(data.toString('utf-8'));
        
        if(json.length > 0){
            let productos = {
                items: json,
                cantidad: 0
            }
            productos.cantidad = productos.items.length;
            res.send(productos);
        }else{
            res.send({error : 'no hay productos cargados'});
        }        
    } catch (err) {
    console.log('Error');
    }
});

app.get('/api/productos/listar/:id', async (req, res)=>{    
    try {
        const data = await fs.promises.readFile('./productos.json');
        const json = JSON.parse(data.toString('utf-8')); 
        const result = json.filter(product => product.id == req.params.id);

        if(result.length > 0){
            res.send(result[0]);
        }else{
            res.send({error : 'producto no encontrado'});
        }
    } catch (err) {
    console.log('Error');
    }
});

app.post('/api/productos/guardar', async (req, res)=>{            
    try {
        const data = await fs.promises.readFile('./productos.json');
        const json = JSON.parse(data.toString('utf-8')); 
        json.push({ ...req.body, id: json.length + 1 });
        try {
            await fs.promises.writeFile('./productos.json', JSON.stringify(json, null, '\t'));
            res.send('Producto cargado exitosamente.')
        } catch (err) {
            throw new Error(err);
        }
    } catch (err) {
    console.log('Error');
    }
});


