import { User } from '../models/userModel';
import { verifyJwt } from '../middlewares/auth/jwt/jwtUtil';
import errorCodes from '../constants/errorCodes';
import { checkPassword } from '../middlewares/auth/bcrypt/bcrypt';
const { EL_USUARIO_NO_EXISTE, CONTRASEÑA_NO_VALIDA } = errorCodes.authErrors;

const registerUser = async (user) => await User.create(user);

const findByEmail = async (email) => await User.findOne({ email: email });

const findByUserName = async (username) =>
  await User.findOne({ username: username });

const authenticate = async ({ email, password }) => {
  try {
    const user = await findByEmail(email);
    
    if (!user) {
      throw new Error(EL_USUARIO_NO_EXISTE);
    }

    const { token, password: DbHashedPassword } = user;
    await checkPassword(password, DbHashedPassword)

    await verifyJwt(token);
    return user;

  } catch (err) {
    throw err;
  }
};


const userService = {
  authenticate,
  registerUser,
  findByEmail,
  findByUserName,
};

export default userService;
