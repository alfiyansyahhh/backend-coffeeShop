const request = require('supertest');
const app = require('../../app');

const getToken = {
  admin: () => {
    const payload = {
      username: 'danang',
      password: 'danang',
    };
    return new Promise((resolve, reject) => {
      request(app)
        .post('/login')
        .send(payload)
        .then((response) => {
          resolve(response.body.data.token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  user: () => {
    const payload = {
      username: 'nana',
      password: 'nana',
    };
    return new Promise((resolve, reject) => {
      request(app)
        .post('/login')
        .send(payload)
        .then((response) => {
          resolve(response.body.data.token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = getToken;
