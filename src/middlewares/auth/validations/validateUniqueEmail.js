import { check } from 'express-validator';
import userService from '../../../services/userService';
import errorCodes from '../../../constants/errorCodes';

const { EMAIL_NO_VALIDO, EMAIL_YA_EN_USO } = errorCodes.authErrors;

const validateUniqueEmail = check('email', EMAIL_NO_VALIDO).custom(
  async (email, { req }) => {
    const user = await userService.findByEmail(email);

    if (!user) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(EMAIL_YA_EN_USO));
  },
);

export default validateUniqueEmail;
