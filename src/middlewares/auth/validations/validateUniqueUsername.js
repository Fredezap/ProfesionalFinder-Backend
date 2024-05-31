import { check } from 'express-validator';
import userService from '../../../services/userService';
import errorCodes from '../../../constants/errorCodes';

const { USERNAME_NOT_VALID, USERNAME_ALREADY_IN_USE } = errorCodes;

const validateUniqueUsername = check('username', USERNAME_NOT_VALID)
  .exists()
  .custom(async (username) => {
    const user = await userService.findByUserName(username);

    if (!user) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(USERNAME_ALREADY_IN_USE));
  });

export default validateUniqueUsername;
