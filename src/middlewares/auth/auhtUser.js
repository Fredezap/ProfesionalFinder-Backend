import { StatusCodes } from 'http-status-codes';
import userService from '../../services/userService';
import errorCodes from '../../constants/errorCodes';

const { 
  ERROR_EN_EL_SERVIDOR_AL_AUTENTICAR_USUARIO,
  EL_USUARIO_NO_EXISTE,
  CONTRASEÑA_NO_VALIDA,
} = errorCodes.authErrors;

const { ERROR_EN_EL_SERVIDOR_AL_CHEQUEAR_CREDENCIALES, CREDENCIALES_INVALIDAS } = errorCodes.bcryptErrors;

const authUser = async (req, res, next) => {
  try {
    const user = await userService.authenticate(req.body);
    return res.status(StatusCodes.OK).send(user);

  } catch (err) {
    let errors = [];
    if (err.message === EL_USUARIO_NO_EXISTE) {
      errors = [{ msg: EL_USUARIO_NO_EXISTE }];
    } else if (err.message === CONTRASEÑA_NO_VALIDA) {
      errors = [{ msg: CONTRASEÑA_NO_VALIDA }];
    } else if (err.message === ERROR_EN_EL_SERVIDOR_AL_CHEQUEAR_CREDENCIALES) {
      errors = [{ msg: ERROR_EN_EL_SERVIDOR_AL_CHEQUEAR_CREDENCIALES }];
    } else if (err.message === CREDENCIALES_INVALIDAS) {
      errors = [{ msg: CREDENCIALES_INVALIDAS }];
    } else {
      errors = [{ msg: ERROR_EN_EL_SERVIDOR_AL_AUTENTICAR_USUARIO }];
    }
    
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors });
  }
};

export default authUser;
