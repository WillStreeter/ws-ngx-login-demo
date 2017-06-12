import { getParamValidator } from './services/augmented.wrapper.service';

// const validatorNames = ['isAfter', 'isAlpha', 'isAlphanumeric', 'isAscii',  'isBase64', 'isBefore', 'isBoolean',
//   'isByteLength', 'isCreditCard', 'isCurrency', 'isDataUri', 'isDate', 'isDecimal', 'isEmail', 'isFloat',
//   'isFloat', 'isFQDN', 'isHexColor', 'isHexaDecimal', 'isInt', 'isIP', 'isISBN', 'isJSON', 'isLowerCase',
//   'isMacAddress', 'isNull', 'isNumeric', 'isUpperCase', 'isURL'];

import { ValidationService } from './services/validation.service';

export const AugmentedValidators  = {
  contains: getParamValidator('contains'),
  equals: getParamValidator('equals'),
  isAfter: getParamValidator('isAfter'),
  isAlpha: getParamValidator('isAlpha'),
  isAlphanumeric: getParamValidator('isAlphanumeric'),
  isAscii: getParamValidator('isAscii'),
  isBase64: getParamValidator('isBase64'),
  isBefore: getParamValidator('isBefore'),
  isBoolean: getParamValidator('isBoolean'),
  isByteLength: getParamValidator('isByteLength'),
  isCreditCard: getParamValidator('isCreditCard'),
  isCurrency: getParamValidator('isCurrency'),
  isDataURI: getParamValidator('isDataURI'),
  isDate: getParamValidator('isDate'),
  isDecimal: getParamValidator('isDecimal'),
  isDivisibleBy: getParamValidator('isDivisibleBy'),
  isEmail: getParamValidator('isEmail'),
  isEmpty: getParamValidator('isEmpty'),
  isFloat: getParamValidator('isFloat'),
  isFQDN: getParamValidator('isFQDN'),
  isFullWidth: getParamValidator('isFullWidth'),
  isHexColor: getParamValidator('isHexColor'),
  isHexaDecimal: getParamValidator('isHexaDecimal'),
  isInt: getParamValidator('isInt'),
  isIP: getParamValidator('isIP'),
  isISBN: getParamValidator('isISBN'),
  isISSN: getParamValidator('isISSN'),
  isISIN: getParamValidator('isISIN'),
  isISO8601: getParamValidator('isISO8601'),
  isIn: getParamValidator('isIn'),
  isJSON: getParamValidator('isJSON'),
  isLength: getParamValidator('isLength'),
  isLowerCase: getParamValidator('isLowerCase'),
  isMACAddress: getParamValidator('isMACAddress'),
  isMD5: getParamValidator('isMD5'),
  isMobilePhone: getParamValidator('isMobilePhone'),
  isMongoId: getParamValidator('isMongoId'),
  isMultibyte: getParamValidator('isMultibyte'),
  isNumeric: getParamValidator('isNumeric'),
  isSurrogatePair: getParamValidator('isSurrogatePair'),
  isUpperCase: getParamValidator('isUpperCase'),
  isURL: getParamValidator('isURL'),
  isUUID: getParamValidator('isUUID'),
  isVariableWidth: getParamValidator('isVariableWidth'),
  isWhiteListed: getParamValidator('isWhiteListed'),
  matches: getParamValidator('matches'),

  //custom
  passwordPattern: ValidationService.passwordValidator()


};
