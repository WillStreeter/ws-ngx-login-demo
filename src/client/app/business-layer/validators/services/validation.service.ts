import { AbstractControl } from '@angular/forms';


export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any):any {
    //console.log("[ValidationService]=== getValidatorErrorMessage ---validatorName ", validatorName)
        let config:any = {
            'required': 'Required',
            'isAlphanumeric':'Only Alpha and Numerical characters.',
            'isAlpha':'Only Alpha characters.',
            'isEmail': 'Invalid email address',
            'userNameAvailable':'This username has been taken',
            'emailMatcher': 'The email address you have entered do not match',
            'invalidPassword': 'Only AlphaNumeric and the "$" sign.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static passwordValidator() {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
          return (options?: any) => {
           return (c: AbstractControl) => {
                if (c.value === null) {
                    return null;
                }
                let regexStr: string = '^[A-Za-z0-9$]+$';
                let regex: RegExp = new RegExp(regexStr);
                if (regex.test(c.value)) {
                    return null;
                }else {
                    return { 'invalidPassword': true };
                }
            };
          };
    }
}
