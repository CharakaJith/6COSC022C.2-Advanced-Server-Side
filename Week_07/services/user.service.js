const bcrypt = require('bcrypt');
const userDao = require('../repositories/user.dao');
const field_validator = require('../util/field_validator');
const { USER_STATUS } = require('../constants/user.constants');

const userService = {
  userSignUp: async (data) => {
    const { firstName, lastName, email, password } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(firstName, 'firstName'));
    errorArray.push(await field_validator.validate_string(lastName, 'lastName'));
    errorArray.push(await field_validator.validate_email(email));
    errorArray.push(await field_validator.validate_string(password, 'password'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      return {
        success: false,
        status: 400,
        data: filteredErrors,
      };
    }

    // check if user already registered
    const user = await userDao.getByEmail(email);
    if (user) {
      return {
        success: false,
        status: 409,
        data: {
          message: 'User already registered!',
        },
      };
    }

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create new user
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      status: USER_STATUS.ACTIVE,
    };
    const newUser = await userDao.create(userDetails);

    // remove password
    delete newUser.password;

    return {
      success: true,
      status: 201,
      data: {
        message: 'User registered successfully!',
        user: newUser,
      },
    };
  },
};

module.exports = userService;
