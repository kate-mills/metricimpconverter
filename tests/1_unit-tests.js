const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('convertHandler should correctly read a whole number input', function () {
      assert.equal(12, convertHandler.getNum('12mi'));
    });
    test('convertHandler should correctly read a decimal number input', function () {
      assert.equal(12.2, convertHandler.getNum('12.2mi'));
    });
    test('convertHandler should correctly read a fractional input', function () {
      assert.equal(1.5, convertHandler.getNum('3/2mi'));
    });
    test('convertHandler should correctly read a fractional input with a decimal', function () {
      assert.equal(1.5714285714285712, convertHandler.getNum('3.3/2.1mi'));
      assert.equal(0.21428571428571427, convertHandler.getNum('1.5/7km'));
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
      assert.equal('invalid number', convertHandler.getNum('3/2/3mi'));
      assert.equal('invalid number', convertHandler.getNum('3//3mi'));
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
      assert.equal(1, convertHandler.getNum('mi'));
      assert.equal(1, convertHandler.getNum(''));
      assert.equal(1, convertHandler.getNum());
    });

    test('convertHandler should correctly read each valid input unit.', function () {
      assert.equal('gal', convertHandler.getUnit('3.3/2gal'));
      assert.equal('L', convertHandler.getUnit('3.3/2L'));
      assert.equal('mi', convertHandler.getUnit('3.3/2mi'));
      assert.equal('km', convertHandler.getUnit('3.3/2km'));
      assert.equal('lbs', convertHandler.getUnit('3.3/2lbs'));
      assert.equal('kg', convertHandler.getUnit('3.3/2kg'));
    });


    test('convertHandler should correctly return an error for an invalid input unit', function () {
      assert.equal('invalid unit', convertHandler.getUnit('3.1/2mil'));
    });



  test('convertHandler should return the correct return unit for each valid input unit.', function () {

      assert.equal('L', convertHandler.getReturnUnit('gal'));
      assert.equal('gal', convertHandler.getReturnUnit('L'));
      assert.equal('km', convertHandler.getReturnUnit('mi'));
      assert.equal('mi', convertHandler.getReturnUnit('km'));
      assert.equal('kg', convertHandler.getReturnUnit('lbs'));
      assert.equal('lbs', convertHandler.getReturnUnit('kg'));

  });




    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
      assert.equal('gallons', convertHandler.spellOutUnit('gal'));
      assert.equal('liters', convertHandler.spellOutUnit('L'));
      assert.equal('miles', convertHandler.spellOutUnit('mi'));
      assert.equal('kilometers', convertHandler.spellOutUnit('km'));
      assert.equal('pounds', convertHandler.spellOutUnit('lbs'));
      assert.equal('kilograms', convertHandler.spellOutUnit('kg'));
    });


    test('convertHandler should correctly convert L to gal', function () {
      assert.equal(0.26417, convertHandler.convert(1, 'l'));
    });
    test('convertHandler should correctly convert gal to L.', function () {
      assert.equal(3.78541, convertHandler.convert(1, 'gal'));
    });
    test('convertHandler should correctly convert mi to km.', function () {
      assert.equal(1.60934, convertHandler.convert(1, 'mi'));
    });
    test('convertHandler should correctly convert km to mi.', function () {
      assert.equal(0.62137, convertHandler.convert(1, 'km'));
    });
    test('convertHandler should correctly convert lbs to kg.', function () {
      assert.equal(0.45359, convertHandler.convert(1, 'lbs'));
    });
    test('convertHandler should correctly convert kg to lbs.', function () {
      assert.equal(2.20462, convertHandler.convert(1, 'kg'));
    });
});
