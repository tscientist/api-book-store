# API Livraria Compasso
API para pesquisar livros.

URL: https://livraria-compasso.glitch.me/api

### Corpo padrão de resposta
```js
{
    "message": "string",        // Texto do código de retorno da requisição
    "error": "boolean",         // Flag que indica se houve erro na requisição
    "statusCode": "number",     // Código de retorno da requisição
    "data": "array/Object"      // Conteúdo/dados da requisição
}
```

## Pesquisar livros
Retorna informações de livros de acordo com um termo de pesquisa.

**metódo:** GET

**path:** /search

**parâmetros**:

|tipo|parâmetro|obrigatório|descrição|
|-|-|-|-|
|string|term|sim|Texto utilizado na pesquisa.|
|int|page|não|Página da pesquisa. Cada página possui 24 itens.|

**resposta**:

|tipo|propriedade|descrição|
|-|-|-|
|array|suggestions|Sugestões de pesquisas relacionadas ao termo pesquisado.|
|array|books|Objetos com as informações dos livros pesquisados.|

## Pesquisar um livro específico
Retorna informações detalhadas de um livro.

**metódo:** GET

**path:** /book

**parâmetros**:

|tipo|parâmetro|obrigatório|descrição|
|-|-|-|-|
|string|id|sim|ID do livro.|

**resposta**:

|tipo|propriedade|descrição|
|-|-|-|
|string|id|ID|
|string|name|Nome|
|string|author|autor(a) ou autores(as)|
|string|brand|Editora|
|date|releaseDate|Data de lançamento|
|array|categories|Categorias|
|string|link|Link para a página web|
|string|description|Descrição|










# Backend test

**Installation**
- clone this repository
- run ```npm install``` - Install dependencies
- run ```npm start``` - Starting the server (port 8000)
- run ```npm test``` - Running automated tests - To run the tests you need to have the API running on port 8000.


{{url}} => http://localhost:8000



 **API endpoints**
 

 ````  {{url}}/books -> GET Show books ````  
 

This route is used to display all registered books with a message of success.

Response:
    
    {
      "success": true,
      "books": [
          {
              "_id": "5e6b7f991d745d47acfa70a8",
              "title": "Como Fazer Amigos e Influenciar Pessoas",
              "category": "Desenvolvimento pessoal",
              "pageCount": 264,
              "publishedDate": "2012-05-18T00:00:00.000Z",
              "thumbnailUrl": "https://images-na.ssl-images-amazon.com/images/I/51dEGjSXrTL._SX359_BO1,204,203,200_.jpg",
              "shortDescription": "O guia clássico e definitivo para relacionar-se com as pessoas",
              "longDescription": "Princípios de Como fazer amigos e influenciar pessoas mostram a você como influenciar os     outros para apoiarem sua visão. Descubra 9 técnicas para aprimorar os relacionamentos e técnicas fundamentais para tornar-se um líder respeitado.",
              "__v": 0
          },
          {
              "_id": "5eb09b29d230e86ad8560c53",
              "title": "Crepusculo",
              "category": "romance",
              "pageCount": 350,
              "publishedDate": "2014-02-01T00:00:00.000Z",
              "thumbnailUrl": "www.site.com",
              "shortDescription": "Vampiro Menina Lobo",
              "longDescription": "descrição",
              "__v": 0
          }
      ]
    }

If any field is sent null or in the wrong format, the book will not be registered and an error message will be displayed     
        
    {
        "Success": false,
        "error": "Você deixou algum campo vazio ou passou alguma informação no formato errado"
    }
    
  
  
  
````  {{url}}/books -> POST Create book````  

This route is used to create a new book, the book data must be informed and in result the route will
return the new book with a message of success.

HEADERS
Content-Type    application/json

BODY    json

Request:

    {   
        "title": "Crepusculo",
        "category": "romance",
        "pageCount": 350,
        "publishedDate": "2014-02-01",
        "thumbnailUrl": "www.site.com",
        "shortDescription": "Vampiro Menina Lobo",
        "longDescription": "descrição"
    }

    
title - String/required
category - String/required
pageCount - Number/required
publishedDate - Date/required
thumbnailUrl - String/required
shortDescription - String/required
longDescription - String/required

Response:

    {
        "Success": true,
        "Message": "Livro cadastrado com sucesso",
        "book": {
            "_id": "5eb09b29d230e86ad8560c53",
            "title": "Crepusculo",
            "category": "romance",
            "pageCount": 350,
            "publishedDate": "2014-02-01T00:00:00.000Z",
            "thumbnailUrl": "www.site.com",
            "shortDescription": "Vampiro Menina Lobo",
            "longDescription": "descrição",
            "__v": 0
        }
    }
    
    
    

````{{url}}/books/:id -> PUT Update book````
        
The request must contain at least one of the attributes of Book and a valid book id entered as a parameter. The update function um verify witch one is and replace then. Returns information from the modified book and a message of success.

HEADERS
Content-Type    application/json
id    String

Request:

    {   
      "title": "O Hobbit"
    }

    
Response:

    {
        "Success": true,
        "Message": "Livro editado com sucesso",
        "book": {
            "_id": "5eb09b29d230e86ad8560c53",
            "title": "O Hobbit",
            "category": "romance",
            "pageCount": 350,
            "publishedDate": "2014-02-01T00:00:00.000Z",
            "thumbnailUrl": "www.site.com",
            "shortDescription": "Vampiro Menina Lobo",
            "longDescription": "descrição",
            "__v": 0
        }
    }


Will display an error message if the user enters an invalid attribute to be updated and status 400.

    
    {
      "error": "Você não informou um campo válido"
    }
    
    {
        "error": "Atributo(s) informados no formato errado"
    }
   
    
````{{url}}/books/:id -> GET Delete book ````

Find a book through the id informed as a parameter and delete it. Returns a message of success.

HEADERS
id    String

Response: 

    {
        "Success": true,
        "Message": "Livro removido com sucesso"
    }

