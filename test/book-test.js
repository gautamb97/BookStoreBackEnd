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

        it('addBook_whenTokenImproper_shouldNotSaveInDB', (done) => {
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
    });
    describe('update book', () => {
        it('updateBook_whenProper_shouldSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .set('token', token)
                .send(bookData.books.updateBookWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('updateBook_whenImProper_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .set('token', token)
                .send(bookData.books.updateWithImProperProperties)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('updateBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .send(bookData.books.updateWithImProperProperties)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('updateBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .set('token', bookData.books.credential.wrongToken)
                .send(bookData.books.updateBookWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('updateBook_whenIdMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/')
                .set('token', token)
                .send(bookData.books.updateWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('updateBook_whenIdImproper_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c')
                .set('token', token)
                .send(bookData.books.updateWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    })

    describe('delete book', () => {
        it.skip('deleteBook_whenProper_shouldSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .set('token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('deleteBook_whenImProper_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .put('/books/60ccd5664df2c24d0c36a219')
                .set('token', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('deleteBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .delete('/books/60ccd5664df2c24d0c36a219')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('deleteBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .delete('/books/60ccd5664df2c24d0c36a219')
                .set('token', bookData.books.credential.wrongToken)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('deleteBook_whenIdMissing_shouldNotSaveInDB', (done) => {
            chai
                .request(server)
                .delete('/books/')
                .set('token', token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    })
});