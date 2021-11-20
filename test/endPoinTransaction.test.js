/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const getToken = require('./helpers/getToken');

describe('test endpoint transaction', () => {
  it('test get transaction', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/transaction')
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
  it('test get transaction details', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/transaction/1')
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
  it('test get transaction users', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/transactionUser')
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
  it('test insert transaction', () => {
    const payload = {
      id_user: '3',
      alamat: 'jl.nana',
      payment: '1',
      shipping: '2',
      subtotal: '10000',
      tax: '100',
      total: '100100',
      details: [
        {
          id_product: '2',
          price: '30000',
          qty: '1',
        },
        {
          id_product: '3',
          price: '40000',
          qty: '2',
        },
      ],
    };
    getToken.user().then((token) => {
      request(app)
        .post('/transaction')
        .set('token', token)
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
  });
  // eror
  it('test get transaction err', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/transaction')
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
  it('test get transaction users err', () => {
    getToken.user().then((token) => {
      request(app)
        .get('/transactionUser')
        .set('tokenn', token)
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
  it('test insert transaction err', () => {
    const payload = {
      id_user: '3',
      alamat: 'jl.nana',
      payment: '1',
      shipping: '2',
      subtotal: '10000',
      tax: '100',
      total: '100100',
      details: [
        {
          id_product: '2',
          price: '30000',
          qty: '1',
        },
        {
          id_product: '3',
          price: '40000',
          qty: '2',
        },
      ],
    };
    getToken.user().then((token) => {
      request(app)
        .post('/transaction')
        .set('token', token)
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
  });
});
