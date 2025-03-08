const bcrypt = require('bcrypt');
const userDao = require('../repositories/user.dao');
const field_validator = require('../util/field_validator');
const { USER_STATUS } = require('../constants/user.constants');
const jwtService = require('./jwt.service');

const userService = {
  userSignUp: async (data) => {
    const { firstName, lastName, email, password } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(firstName, 'First name'));
    errorArray.push(await field_validator.validate_string(lastName, 'Last name'));
    errorArray.push(await field_validator.validate_email(email));
    errorArray.push(await field_validator.validate_string(password, 'Password'));

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

  userLogIn: async (data) => {
    const { email, password } = data;

    // validate user details
    const errorArray = [];
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

    // check if user registered
    const user = await userDao.getByEmail(email);
    if (!user) {
      return {
        success: false,
        status: 401,
        data: {
          message: 'Invalid user credentials!',
        },
      };
    }

    // validate password and remove it
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        status: 401,
        data: {
          message: 'Invalid user credentials!',
        },
      };
    }
    delete user.password;

    // check if user is active
    if (user.user_status != USER_STATUS.ACTIVE) {
      return {
        success: false,
        status: 403,
        data: {
          message: 'User is not active!',
        },
      };
    }

    // generate access token
    const tokenUser = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      status: user.user_status,
    };
    const accessToken = await jwtService.generateAccessToken(tokenUser);

    return {
      success: true,
      status: 200,
      data: {
        message: 'User logged in!',
        user: user,
      },
      accessToken: accessToken,
    };
  },
};

module.exports = userService;
