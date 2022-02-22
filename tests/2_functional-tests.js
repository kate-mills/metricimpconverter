const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    // #1
    test('Test GET /api/convert with valid input', function (done) {
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify({"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}));
          done();
        });
    });

    // #2
    test('Test GET /api/convert with invalid unit', function (done) {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          done();
        });
    });

    // #3
    test('Test GET /api/convert with invalid number', function (done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          done();
        });
    });

    // #4
    test('Test GET /api/convert with invalid number and unit', function (done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          done();
        });
      });

    // #5
    test('Test GET /api/convert input without a number', function (done) {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify({"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}));
          done();
        });
      });


  this.timeout(5000);
});
