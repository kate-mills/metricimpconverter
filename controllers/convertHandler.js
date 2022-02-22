const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
const arrayOfUnits = [
  {initUnit:'gal',level:0,conversion: galToL},
  {initUnit:'l',  level:1,conversion: galToL},
  {initUnit:'lbs',level:0,conversion: lbsToKg},
  {initUnit:'kg', level:1,conversion: lbsToKg},
  {initUnit:'mi', level:0,conversion: miToKm},
  {initUnit:'km', level:1,conversion: miToKm}
];

const getDecimalAndSlashDetails =  (input) => {
  let decimalArray  = ((!!input) ? "".concat(input).split('.') : []);
  let fractionArray  = ((!!input) ? "".concat(input).split('/') : []);
  let decimalError = (
    (decimalArray.length===2) &&
    !(parseFloat(decimalArray[0]) &&
      (parseFloat(decimalArray[1])))
  );
  return {
    decimal: {
      count: decimalArray.length,
      error: ((decimalArray.length > 2 && fractionArray.length === 1) || decimalError),
      array: decimalArray,
    },
    fraction: {
      count: fractionArray.length,
      error: fractionArray.length > 2,
      array: fractionArray
    }
  }
};

function ConvertHandler() {
  this.checkForInvalidInput = (initNum, initUnit) => {
    let unitErr = initUnit === 'invalid unit' && 'invalid unit';
    let numErr = initNum === 'invalid number' && 'invalid number';
    let doubleError = (unitErr && numErr) && 'invalid number and unit';
    return doubleError || unitErr || numErr || "";
  }

  this.getNum = function(input) {
    const {decimal, fraction} = getDecimalAndSlashDetails(input);

    if(decimal.error || fraction.error){
      return 'invalid number'
    }
    if(fraction.count === 1){
      return parseFloat(fraction.array[0])||1;
    }
    if(fraction.count === 2){
      return (parseFloat(fraction.array[0])/parseFloat(fraction.array[1]));
    }
    return 1;
  };
  
  this.getUnit = function(input) {
    if(!input) return "invalid unit";

    // Look for letters in the end of the string
    let regexMatchLastLetters = /[a-z][a-z]?[a-z]?$/i;
    let lastLetters = input.match(regexMatchLastLetters);

    let positiveLetters = !!lastLetters && lastLetters[0]
    if(!positiveLetters) {return 'invalid unit';}

    // Look for perfect unit match
    let regexMatchUnit = /\b(l|gal|mi|km|lbs|kg)\b/i;
    let result= positiveLetters.match(regexMatchUnit);

    let noMatch = (result === null || result[0].length != positiveLetters.length)
    if(noMatch){return 'invalid unit';}
    
    let match = result[0].toLowerCase();
    return ( match === 'l' ? 'L': match );
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = {};
    result['gal'] = 'L'
    result['l'] = 'gal'
    result['mi'] = 'km'
    result['km'] = 'mi'
    result['lbs'] = 'kg'
    result['kg'] = 'lbs'
    return result[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    let result = {};
    result['gal'] = 'gallons'
    result['l'] = 'liters'
    result['mi'] = 'miles'
    result['km'] = 'kilometers'
    result['lbs'] = 'pounds'
    result['kg'] = 'kilograms'
    return result[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    if(initUnit === 'invalid unit'){
      return;
    }
    let unit = arrayOfUnits.find((unit) => {
      return unit.initUnit === initUnit.toLowerCase()
    });
    let returnNum = (unit.level > 0)
      ? (initNum / unit.conversion).toFixed(5)
      : (initNum * unit.conversion).toFixed(5)
    return parseFloat(returnNum)
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) +
      " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };
}

module.exports = ConvertHandler;
