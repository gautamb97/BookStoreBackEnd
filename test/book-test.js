const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const bookData = require('./book.json');
const loginData = require('./user.json')

chai.should();

let token = '';

describe('Book CRUD', () => {
    before((done) => {
        chai
        .request(server)
        .post('/adminLogin')
        .send(loginData.user.adminLogin)
        .end((err, res) => {
          token = res.body.token
          done();
        });
    });
    describe('add book', () => {
        it.skip('addBook_whenProper_shouldSaveInDB', (done) => {
            chai
              .request(server)
              .post('/books')
              .set('token', token)
              .send(bookData.books.addBookWithProperProperties)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });

          it('addBook_whenImProper_shouldNotSaveInDB', (done) => {
            chai
              .request(server)
              .post('/books')
              .set('token', token)
              .send(bookData.books.addBookWithImProperProperties)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });

          it('addBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
              .request(server)
              .post('/books')
              .send(bookData.books.addBookWithImProperProperties)
              .end((err, res) => {
                res.should.have.status(401);
                done();
              });
          });

          it('addBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
              .request(server)
              .post('/books')
              .set('token', bookData.books.credential.wrongToken)
              .send(bookData.books.addBookWithProperProperties)
              .end((err, res) => {
                res.should.have.status(401);
                done();
              });
          });
    })
});