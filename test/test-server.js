const expect  = require('chai').expect;
const request = require('request');
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var mongoose = require('mongoose')
var assert = require('assert');


const baseUrl = 'http://localhost:8000';

it('Should show all books on /books GET', done => {
        chai.request(baseUrl)
            .get('/books')
            .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res).to.not.have.property('a');
            done();
        });
})

it('Should create baseUrl new book on /books POST', done => {
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
            expect(res).to.not.have.property('a');
            done();
        });

})

it('Should update an existing book on /books/:id PUT', done => {
    let id = '5bec08080ed7b42b4ccd1e53';

    chai.request(baseUrl)
        .put(`/books/${id}`)
        .send({
            "title": "O Hobbit",
            "pageCount": 200,
            "shortDescription": "an unexpected journey"
        })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res).to.not.have.property('a');
            done();
        });
});

it('Should delete a book on /books/:id DELETE', done => {
    let id = '5eb080a4851faf3b7089b39b';
    chai.request(baseUrl)
        .delete(`/books/${id}`)
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res).to.not.have.property('a');
            done();
        });
});
