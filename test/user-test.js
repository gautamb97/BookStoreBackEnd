const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./user.json');

chai.should();

describe('user registartion', () => {
  it.skip('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
    chai
      .request(server)
      .post('/userRegistration')
      .send(registrationData.user.registration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
    chai
      .request(server)
      .post('/userRegistration')
      .send(registrationData.user.registrationWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('admin registartion', () => {
    it.skip('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
      chai
        .request(server)
        .post('/adminRegistration')
        .send(registrationData.user.adminRegistration)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenRegistrationDetails_whenImpProper_shouldNotSaveInDB', (done) => {
      chai
        .request(server)
        .post('/adminRegistration')
        .send(registrationData.user.registrationWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('user login', () => {
    it('givenUserLoginDetails_whenProper_shouldAbleToLogin', (done) => {
      chai
        .request(server)
        .post('/userLogin')
        .send(registrationData.user.userLogin)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenUserLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
      chai
        .request(server)
        .post('/userLogin')
        .send(registrationData.user.userLoginWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
        });
        done();
    });
  });

  describe('admin login', () => {
    it('givenAdminLoginDetails_whenProper_shouldAbleToLogin', (done) => {
      chai
        .request(server)
        .post('/adminLogin')
        .send(registrationData.user.adminLogin)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenAdminLoginDetails_whenImproper_shouldUnableToLogin', (done) => {
      chai
        .request(server)
        .post('/adminLogin')
        .send(registrationData.user.adminLoginWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
        });
        done();
    });
  });

  describe('forgotPassword', () => {
    it.skip('givenEmail_whenProper_shouldSendMail', (done) => {
      chai
        .request(server)
        .post('/forgotPassword')
        .send(registrationData.user.forgotPasswordData)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('givenEmail_whenImproper_shouldNotSendMail', (done) => {
      chai
        .request(server)
        .post('/forgotPassword')
        .send(registrationData.user.forgotPasswordWithImproperDetails)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
  });

describe('resetPassword', () => {
  it('givenToken_whenImproper_shouldNotResetPassword', (done) => {
    chai
      .request(server)
      .post('/resetPassword')
      .set('token', `${registrationData.user.credentials.wrongToken}`)
      .send(registrationData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it.skip('givenToken_whenProper_shouldResetPassword', (done) => {
    chai
      .request(server)
      .post('/resetPassword')
      .set('token', `${registrationData.user.credentials.token}`)
      .send(registrationData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

  
  