/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');
const getToken = require('./helpers/getToken');

describe('test endpoint users', () => {
  it('test login users', () => {
    const payload = {
      username: 'danang',
      password: 'danang',
    };
    request(app)
      .post('/login')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test register users', () => {
    const payload = {
      username: 'ilham',
      password: 'hiasda',
    };
    request(app)
      .post('/register')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test get users', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/users')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test get users details', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/users/1')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test insert users', () => {
    const filePath = `${__dirname}/helpers/images/images.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        request(app)
          .post('/users')
          .field('username', 'kiki123')
          .field('password', 'testing')
          .field('display_name', 'testing')
          .field('first_name', 'testfing')
          .field('last_name', 'testing')
          .field('ttgl', 'testing')
          .field('gender', 'testing')
          .field('email_address', 'kiki123')
          .field('phone_number', 'testing')
          .field('delivery_address', 'teasdsting')
          .attach('image', filePath)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('object');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  it('test update users', () => {
    const filePath = `${__dirname}/helpers/images/images2.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put('/users/8')
            .set('token', token)
            .field('username', 'dimas123')
            .field('password', 'testing3')
            .attach('image', filePath)
            .field('display_name', 'testing2')
            .field('first_name', 'testing2')
            .field('last_name', 'testing2')
            .field('ttgl', 'testing2')
            .field('gender', 'testing2')
            .field('email_address', 'dimas123')
            .field('phone_number', 'testing2')
            .field('delivery_address', 'testing2')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
              expect(response.body).to.be.a('object');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  it('test delete users', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/users/20')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  // err
  it('test get users err', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/users')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(401)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
