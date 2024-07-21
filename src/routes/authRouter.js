import express from 'express';
import runValidations from '../middlewares/common/validations/runValidations';
import validateEmailFormat from '../middlewares/auth/validations/validateEmailFormat';
import validatePassword from '../middlewares/auth/validations/validatePassword';
import validateUniqueEmail from '../middlewares/auth/validations/validateUniqueEmail';
import validateUniqueUsername from '../middlewares/auth/validations/validateUniqueUsername';
import registerUser from '../middlewares/auth/registerUser';
import auhtUser from '../middlewares/auth/auhtUser';
import validateState from '../middlewares/auth/validations/validateState';
import validateCity from '../middlewares/auth/validations/validateCity';
import validateAddress from '../middlewares/auth/validations/validateAddress';
import validatePostalCode from '../middlewares/auth/validations/validatePostalCode';
import normalizeEmail from '../middlewares/auth/normalizeEmail';
import capitalizeUsername from '../middlewares/auth/capitalizeUsername';
import { signJwt } from '../middlewares/auth/jwt/jwtUtil';

const authRouter = express.Router();

// TODO: Chequear si validar username unico seria necesario...
const registerValidations = runValidations([
  validateEmailFormat,
  validatePassword,
  validateUniqueEmail,
  validateUniqueUsername,
  validateState,
  validateCity,
  validateAddress,
  validatePostalCode
]);

// TODO: Crear un token de validacion de email (user.verificationToken)
authRouter.post(
  '/register',
  imp,
  registerValidations,
  capitalizeUsername,
  normalizeEmail,
  signJwt,
  registerUser
);

const authValidations = runValidations([validateEmailFormat, validatePassword]);

authRouter.post('/login', imp, authValidations, auhtUser);

// TODO: Crear un endpoint que valide el token e email en db para
// TODO: reedireccionar en el front si es que las credenciales son validas

export default authRouter;
