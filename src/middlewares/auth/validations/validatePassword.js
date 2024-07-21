import { check } from 'express-validator';
import { MIN_PASSWORD_LENGTH } from '../../../models/userModel';
import errorCodes from '../../../constants/errorCodes';

const { CONTRASEÑA_NO_VALIDA, CONTRASEÑA_DEMASIADO_CORTA } = errorCodes.authErrors;

const validatePassword = check('password', CONTRASEÑA_NO_VALIDA)
  .isString()
  .isLength({ min: MIN_PASSWORD_LENGTH })
  .withMessage(`${CONTRASEÑA_DEMASIADO_CORTA}`);

export default validatePassword;
