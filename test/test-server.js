const expect  = require('chai').expect;
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var assert = require('assert');

const baseUrl = 'http://localhost:8000';

it('Should show all books on /books GET', done => {
        chai.request(baseUrl)
            .get('/books')
            .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
})

it('Should create new book on /books POST', done => {
    chai.request(baseUrl)
        .post('/books')
        .send({
            "title": "Crepusculo",
            "category": "romance",
            "pageCount": 200,
            "publishedDate": "2014-02-01",
            "thumbnailUrl": "www.crepusculo-foto.com",
            "shortDescription": "romance menina vampiro lobo",
            "longDescription": "descrição longa"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('Message');
            expect(res.body).to.have.property('book');
            expect(res.body.Success).to.be.equals(true);
            done();
        });

})

it('Should not create a new book on /books POST - Missing field', done => {
    chai.request(baseUrl)
        .post('/books')
        .send({
            "title": "Crepusculo",
            "category": "romance",
            "pageCount": 200,
            "thumbnailUrl": "www.crepusculo-foto.com",
            "shortDescription": "romance menina vampiro lobo",
            "longDescription": "descrição longa"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('error');
            expect(res.body.Success).to.be.equals(false);
            done();
        });

})

it('Should update an existing book on /books/:id PUT', done => {
    let id = '5e6b7f991d745d47acfa70a8';

    chai.request(baseUrl)
        .put(`/books/${id}`)
        .send({
            "title": "O Hobbit",
            "pageCount": 200,
            "shortDescription": "an unexpected journey"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.body).to.have.property('Message');
            expect(res.body).to.have.property('book');
            expect(res.body.Success).to.be.equals(true);
            done();
        });
});

it('Should not update an existing book on /books/:id PUT - Wrong attribute format', done => {
    let id = '5e6b7f991d745d47acfa70a8';

    chai.request(baseUrl)
        .put(`/books/${id}`)
        .send({
            "title": "O Hobbit",
            "pageCount": "carol",
            "shortDescription": "an unexpected journey"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('error');
            done();
        });
});

it('Should not update an existing book on /books/:id PUT - Invalid Field', done => {
    let id = '5e6b7f991d745d47acfa70a8';

    chai.request(baseUrl)
        .put(`/books/${id}`)
        .send({
            "author": "O Hobbit",
            "pageCount": "carol",
            "shortDescription": "an unexpected journey"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.body).to.have.property('error');
            done();
        });
});

it('Should delete a book on /books/:id DELETE', done => {
    let id = '5eb09b29d230e86ad8560c53';
    chai.request(baseUrl)
        .delete(`/books/${id}`)
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.not.have.property('error');
            done();
        });
});
