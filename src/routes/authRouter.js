import express from 'express';
import runValidations from '../middlewares/common/validations/runValidations';
import validateEmailFormat from '../middlewares/auth/validations/validateEmailFormat';
import validatePassword from '../middlewares/auth/validations/validatePassword';
import validateUniqueEmail from '../middlewares/auth/validations/validateUniqueEmail';

import registerUser from '../middlewares/auth/registerUser';

const authRouter = express.Router();

const registerValidations = runValidations([
  validateEmailFormat,
  validatePassword,
  validateUniqueEmail,
]);

authRouter.post('/register', registerValidations, registerUser);

export default authRouter;
