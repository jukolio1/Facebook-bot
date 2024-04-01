const express = require('express');
const bodyParser = require('body-parser'); 

const app = express().use(bodyParser.json());



app.post('/webhook', (req,res) => {
    console.log('POST: webhook')
    const body = req.body;
    if(body.object === 'page'){
        body.entry.forEach(entry =>{
            //Resiben y procesan los mensajes
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });
        res.status(200).send('Evento Recibido');
    }else{
        res.sendStatus(404);
    }
});

app.get('/webhook',(req,res)=> {
    console.log('GET: webhook')
 
    const VERIFY_TOKEN = 'stringUnicoParaTuAplicacion';
    const mode  = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if(mode && token){
      if(mode === 'subscribe' && token === VERIFY_TOKEN ){
           console.log('WBHOOK VERIFICADO');
           res.status(200).send(challenge);
        }else{
           res.sendStatus(404); 
        }
   }
});

app.get('/', (req, res) => {
    const htmlContent = `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bot</title>
        
            <style>
                body {
                       font-family: Arial, Helvetica, sans-serif;
                }
            </style>
        </head>
        <body>
           <h1>Faceboo-bot</h1>
           <h3>Esta es la pagina principal de mi bot </h3>
        </body>
        </html>
    `;
    res.status(200).send(htmlContent);
});
app.listen(8080, () => {
    console.log('El servidor está escuchando en el puerto 8080');
});
