import { AbstractControl } from '@angular/forms';
import * as validator from 'validator';


/**
 * Wrapper for calling validator js functions
 *
 * @param {any} name name of the validator to be called e.g isEmail
 * @param {any} value value passed from the abstract control
 * @param {any} options optional parameters
 * @returns
 */
const getValidator = (name, value, options) => {
  if (options) {
    return validator[name](value, options) ? null : {
      [name]: {
        valid: false
      }
    };
  }

  return validator[name](value) ? null : {
    [name]: {
      valid: false
    }
  };
};

/**
 * Gets the validators with parameter.
 * Parameters are optional since some validators do not require them
 *
 * @export
 * @param {string} name name of the validator
 * @returns angular form validator
 */
/**
 *
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getParamValidator(name: string) {
  return (options?: any) => {
    return (c: AbstractControl) => {
      return getValidator(name, c.value, options);
    };
  };
}
