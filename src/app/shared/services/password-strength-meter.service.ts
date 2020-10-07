import { Injectable } from '@angular/core';

import * as zxcvbn_ from 'zxcvbn';

const zxcvbn = zxcvbn_;

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthMeterService {

  constructor() { }

  /**
   *  this will return the password strength score in number
   *  0 - too guessable
   *  1 - very guessable
   *  2 - somewhat guessable
   *  3 - safely unguessable
   *  4 - very unguessable
   */
  score(password: string): number {
    const result = zxcvbn(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: string[]; warning: string } }
   *
   */
  scoreWithFeedback(password: string): { score: number; feedback: { suggestions: string[]; warning: string } } {
    if (!password) {
      return {
        score: 0, feedback: {suggestions: [], warning: ''}
      };
    }
    if (!/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.()-]).{6,}$/.test(password)) {
      return {
        score: 0,
        feedback: {
          suggestions: [],
          warning: 'Enter a strong password with minimum six characters, at least one letter, one number and one special character.'
        }
      };
    }
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }
}
