import * as express from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from '../exceptions/httpException';

export default function validationMiddleware<T>(type: any): express.RequestHandler {
  // tslint:disable-next-line: variable-name
  return (req, _res, next) => {
    validate(plainToClass(type, req.body))
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            if (error.constraints && error.constraints)  return Object.values(error.constraints);

            // tslint:disable-next-line: no-increment-decrement
            for (let i = 0; i < 10; i++) {
              if (error.constraints) return Object.values(error.constraints);
              if (!error.children) break;
              // tslint:disable-next-line: no-parameter-reassignment
              error = error.children[0];
            }
            return error;
          }).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}
