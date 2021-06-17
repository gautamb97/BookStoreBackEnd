const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');

chai.should();

describe('user registartion', () => {
  it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    chai
      .request(server)
      .post('/user/registration')
      .send(registrationData.user.registration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    chai
      .request(server)
      .post('/user/registration')
      .send(registrationData.user.registrationWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('admin registartion', () => {
    it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
      chai
        .request(server)
        .post('/admin/registration')
        .send(registrationData.user.adminRegistration)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
      chai
        .request(server)
        .post('/user/registration')
        .send(registrationData.user.registrationWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('login', () => {
    it('givenLoginDetails_whenProper_shouldAbleToLogin', (done) => {
      chai
        .request(server)
        .post('/login')
        .send(registrationData.user.login)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
      chai
        .request(server)
        .post('/login')
        .send(registrationData.user.loginWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  