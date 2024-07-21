import { check } from 'express-validator';
import userService from '../../../services/userService';
import errorCodes from '../../../constants/errorCodes';
import { MIN_USERNAME_LENGTH } from '../../../models/userModel';

const {
  NOMBRE_DE_USUARIO_NO_VALIDO,
  NOMBRE_DE_USUARIO_YA_EN_USO,
  NOMBRE_DE_USUARIO_DEMASIADO_CORTO 
} = errorCodes.authErrors;

const validateUniqueUsername = check('username', NOMBRE_DE_USUARIO_NO_VALIDO)
  .exists()
  .isString()
  .isLength({ min: MIN_USERNAME_LENGTH })
  .withMessage(`${NOMBRE_DE_USUARIO_DEMASIADO_CORTO}`)
  .custom(async (username) => {
    const user = await userService.findByUserName(username);
    if (!user) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(NOMBRE_DE_USUARIO_YA_EN_USO));
  });

export default validateUniqueUsername;
