const router = express.Router();
var booksModel = require("../models/bookModel");

router.get('/', (req, res) => {    
    //Crie aqui a função para listar todos os livros cadastrados na estrutura (models/bookModel) do mongodb 
    booksModel.find(function (err, books) {
        if  (err)
            return res.send(err);

        res.json(books);
        // res.json({
        //     success: true,
        //     books: ""
        // }, [ books])
    })
})
/**
 * Crie aqui a função para atualizar os dados de um livro com base no id do mesmo
 */
router.put('/:id', (req, res) => {
    booksModel.findOne({
        _id: req.params.id
    })
        .then(book => {
            allowedParams = [
                "title",
                "category",
                "pageCount",
                "publishedDate",
                "thumbnailUrl",
                "shortDescription",
                "longDescription"
            ];

            for (param in req.body) {
                if (allowedParams.includes(param))
                    book[param] = req.body[param]
            }

            book.save(function (err) {
                if (err)
                    res.send(err)

                res.json({ message: 'book updated!' });
            })
        })
        .catch((err) => {
            return res.json(err)
        })
})

/**
 * Crie aqui a função para cadastrar os dados de um livro
 */
router.post('/', (req, res) => {
    const book = new booksModel(req.body)

    book.save()
        .then(book => {
            return res.json(book)
        })
        .catch(err => {
            res.status(500).json({msg: 'Sorry, internal server errors'})
            console.log(err)
            return;
        })
})

router.delete('/delete/:id', (req, res) => {
    //Crie aqui a função para remover os dados de um livro
    booksModel.deleteOne({
        _id: req.params.id
    }, function(error) {
        if(error)
            res.send(error);

        res.json({ message: 'Usuário excluído com Sucesso! '});
    });
})

module.exports = router;