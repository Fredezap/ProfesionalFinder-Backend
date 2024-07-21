import jwt from 'jsonwebtoken';
import errorCodes from '../../../constants/errorCodes';
import { StatusCodes } from 'http-status-codes';
import { promisify } from 'util';

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

const {   
  ERROR_DEL_SERVIDOR_AL_GENERAR_EL_TOKEN,
  EL_TOKEN_HA_EXPIRADO,
  CREDENCIALES_INVALIDAS,
  ERROR_DESCONOCIDO_AL_VERIFICAR_EL_TOKEN,
} = errorCodes.jwtErrors

export const signJwt = async (req, res, next) => {
  try {
    const { email, username } = req.body
    const payload = { email, username }
    const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: '730h' });
    req.body.token = token
    return next();
  } catch (error) {
    const errors = [{ msg: ERROR_DEL_SERVIDOR_AL_GENERAR_EL_TOKEN }]
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  }
};

export const verifyJwt = async (token) => {
  try {
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);
    return decoded
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      errors = [{ msg: EL_TOKEN_HA_EXPIRADO }]
      return res.status(StatusCodes.UNAUTHORIZED).json({ errors });
    } else if (err instanceof jwt.JsonWebTokenError) {
      errors = [{ msg: CREDENCIALES_INVALIDAS }]
      return res.status(StatusCodes.UNAUTHORIZED).json({ errors });
    } else {
      errors = [{ msg: ERROR_DESCONOCIDO_AL_VERIFICAR_EL_TOKEN }]
      return res.status(StatusCodes.UNAUTHORIZED).json({ errors });
    }
  }
};

const jwtUtil = {
  signJwt,
  verifyJwt,
};

export default jwtUtil;
