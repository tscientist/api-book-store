const router = express.Router();
var booksModel = require("../models/bookModel");

/**
 * Crie aqui a função para listar todos os livros cadastrados na estrutura (models/bookModel) do mongodb
 */
router.get('/', (req, res) => {
    booksModel.find(function (err, books) {
        if  (err){
            res.json({
                Success: false,
                error: 'Desculpe, erro do servidor'
            })
            console.log(err)
        }

        res.json({
            success: true,
            books
        })
    })
})

/**
 * Crie aqui a função para cadastrar os dados de um livro
 */
router.post('/', (req, res) => {
    const book = new booksModel(req.body)

    book.save()
        .then(book => {
            return res.json({
                Success: true,
                Message: 'Livro cadastrado com sucesso',
                book
            })
        })
        .catch(err => {
            res.json({
                Success: false,
                error: 'Você deixou algum campo vazio ou passou alguma informação no formato errado'
            })
            console.log(err)
            return;
        })
})

/**
 * Crie aqui a função para atualizar os dados de um livro com base no id do mesmo
 */
router.put('/:id', (req, res) => {
    let error = true

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
                if (allowedParams.includes(param)) {
                    book[param] = req.body[param]
                    error = false;
                }
            }
            if (error){
                return res.status(400).json({
                    error: 'Você não informou um campo válido'
                })
            }

            book.save()
                .then(book => {
                    return res.json({
                        Success: true,
                        Message: 'Livro editado com sucesso',
                        book
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return res.json({
                        error: 'Atributo(s) informado(s) no formato errado'
                    })
                })
        })
        .catch((err) => {
            return res.json({
                error: 'Desculpe, erro do servidor'
            })

        })
})

/**
 * Crie aqui a função para remover os dados de um livro
 */
router.delete('/:id', (req, res) => {
    booksModel.deleteOne({
        _id: req.params.id
    }, function(err) {
        if  (err) {
            res.status(500).json({
                Success: false,
                error: 'Desculpe, erro do servidor'
            })
            console.log(err)
        }
        return res.json({
            Success: true,
            Message: 'Livro removido com sucesso',
        })
    });
})

module.exports = router;