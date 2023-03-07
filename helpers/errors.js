class ValidationError extends Error{
    constructor(message) {
         super(message)
        this.status = 400
    }
}
class UnexistedContactError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
    ValidationError, UnexistedContactError
} 