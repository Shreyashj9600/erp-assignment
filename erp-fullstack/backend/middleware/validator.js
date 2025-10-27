// small wrapper to use Joi in controllers (no external dependency)
const createError = require('http-errors');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (result.error) {
      const details = result.error.details.map(d => d.message).join(', ');
      return next(createError(400, details));
    }
    next();
  };
}

module.exports = { validate };
