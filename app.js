express = require('express');
mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

const bodyParser = require('body-parser');
const {
    connect
} = require('./config/db');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))

const PORT = 8000;

app.get('/', (req, res) => {
     res.json({
        success: true,
        message: 'Funcionando! :D'
    })
})

db = connect();
db.then(() => {
        console.log('DB Conectado! :D')
        const booksRoutes = require('./routes/books');
        app.use('/books', booksRoutes);

        app.listen(PORT, () => {
            console.log('Servidor ligado na porta ' + PORT);
        });
    })
    .catch(e => {
        console.log('Não foi possível estabelecer conexão com o banco. :-(', e)
    })