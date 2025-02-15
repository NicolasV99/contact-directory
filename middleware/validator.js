const { body, validationResult } = require('express-validator');

const validationRules = () => {
  console.log('Applying Validation Rules');
  return [
    body('name')
      .custom(value => {
        const nameParts = value.trim().split(' ');
        if (nameParts.length !== 2) {
          throw new Error('Name must consist of two words separated by a space');
        }
        return true;
      }),
    body('email').isEmail().withMessage('Email must be valid'),
  ];
};

const companyValidationRules = () => {
  console.log('Applying Validation Rules');
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('website')
      .custom(value => {
        // Regular expression to check if the website is valid
        const websiteRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*\/?$/;
        if (!websiteRegex.test(value)) {
          throw new Error('Website must be valid');
        }
        return true;
      })
  ];
};

const validate = (req, res, next) => {
  console.log('Validating request...');
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      console.log('Validation passed.');
      return next();
  }
  console.log('Validation errors:', errors.array());
  const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));  
  return res.status(400).json({
      errors: extractedErrors,
  });
};

  
module.exports = {
  validationRules,
  companyValidationRules,
  validate
}