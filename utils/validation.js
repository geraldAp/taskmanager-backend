const Joi = require("joi");

const validateUserRegistration = ({ fullname, userName, email, password }) => {
  const schema = Joi.object({
    fullname: Joi.string().required().messages({
      "any.required": "Full name is required.",
      "string.empty": "Full name must not be empty.",
    }),
    userName: Joi.string().required().messages({
      "any.required": "User name is required.",
      "string.empty": "User name must not be empty.",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email must not be empty.",
      "string.email": "Invalid email format.",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required.",
      "string.empty": "Password must not be empty.",
      "string.min": "Password must be at least 6 characters long.",
    }),
  });
  return schema.validate({
    fullname,
    userName,
    email,
    password,
  });
};

// login
const validateLoginData = (userName, password) => {
  // / Define Joi schema for validation with custom error messages
  const joiSchema = Joi.object({
    userName: Joi.string().required().messages({
      "any.required": "User name is required.",
      "string.empty": "User name must not be empty.",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required.",
      "string.empty": "Password must not be empty.",
      "string.min": "Password must be at least 6 characters long.",
    }),
  });

  // Validate the data
  const validation = joiSchema.validate({
    userName,
    password,
  });

  return validation;
};

module.exports = { validateUserRegistration , validateLoginData};
