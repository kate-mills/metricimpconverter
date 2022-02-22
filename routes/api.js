'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res, next) {
    const {query:{input}} = req;

    const initNum = convertHandler.getNum(input); 
    const initUnit = convertHandler.getUnit(input); 

    let inputError = convertHandler.checkForInvalidInput(initNum, initUnit)

    if(inputError){return res.status(200).send(inputError)}

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit); 

   return res.status(200).send({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
   });
  })
};
