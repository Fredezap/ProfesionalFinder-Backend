import express from 'express';
import runValidations from '../middlewares/common/validations/runValidations';
import validateEmailFormat from '../middlewares/auth/validations/validateEmailFormat';
import validatePassword from '../middlewares/auth/validations/validatePassword';
import validateUniqueEmail from '../middlewares/auth/validations/validateUniqueEmail';
import validateUniqueUsername from '../middlewares/auth/validations/validateUniqueUsername';

import registerUser from '../middlewares/auth/registerUser';
import auhtUser from '../middlewares/auth/auhtUser';

const authRouter = express.Router();

const registerValidations = runValidations([
  validateEmailFormat,
  validatePassword,
  validateUniqueEmail,
  validateUniqueUsername,
]);

authRouter.post('/register', registerValidations, registerUser);

const authValidations = runValidations([validateEmailFormat, validatePassword]);

authRouter.post('/', authValidations, auhtUser);

export default authRouter;
