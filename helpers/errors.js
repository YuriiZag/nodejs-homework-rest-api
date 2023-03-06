class PhonebookError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends PhonebookError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class UnexistedContactError extends PhonebookError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class UnauthorizedError extends PhonebookError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends PhonebookError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  PhonebookError,
  ValidationError,
  UnexistedContactError,
  UnauthorizedError,
  ConflictError,
};
