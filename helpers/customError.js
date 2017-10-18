'use strict';

export const customError = (message, status)=> {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
};

require('util').inherits(module.exports, Error);

export default customError