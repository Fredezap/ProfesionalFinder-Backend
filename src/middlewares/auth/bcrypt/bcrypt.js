import bcrypt from 'bcrypt';
import errorCodes from '../../../constants/errorCodes.js';

// Password hashing middleware
const { ERROR_EN_EL_SERVIDOR_AL_CHEQUEAR_CREDENCIALES, CREDENCIALES_INVALIDAS } = errorCodes.bcryptErrors;

let errors;

// export const hashPassword = async (req, res, next) => {
//   let { password } = req.body;
//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     delete req.body.confirmPassword;
//     req.body.password = hashedPassword;
//     next();
//   } catch (error) {
//     const errors = [{ msg: SERVER_ERROR_PROCCESING_PASSWORD }]
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
//   }
// };

// Password verifying middleware
export const checkPassword = async (plainPassword, DbHashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, DbHashedPassword);
    if (isMatch) {
      return true;
    } else {
      throw new Error(CREDENCIALES_INVALIDAS);
    }
  } catch (error) {
    if (error.message === CREDENCIALES_INVALIDAS) {
      throw new Error(CREDENCIALES_INVALIDAS);
    } else {
      throw new Error(ERROR_EN_EL_SERVIDOR_AL_CHEQUEAR_CREDENCIALES);
    }
  }
};
