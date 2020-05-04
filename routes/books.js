const router = express.Router();
var booksModel = require("../models/bookModel");

router.get('/', (req, res) => {    
    //Crie aqui a função para listar todos os livros cadastrados na estrutura (models/bookModel) do mongodb 
    // res.json({
    //     success: true,
    //     books: []
    // })
})

router.put('/:id', (req, res) => {
    //Crie aqui a função para atualizar os dados de um livro com base no id do mesmo 
})

router.post('/', (req, res) => {
     //Crie aqui a função para cadastrar os dados de um livro  
})

router.delete('/', (req, res) => {
    //Crie aqui a função para remover os dados de um livro  
})

module.exports = router;