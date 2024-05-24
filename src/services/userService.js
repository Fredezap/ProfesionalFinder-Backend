import { User } from '../models/userModel';
import { signJwt } from '../utils/jwtUtil';
import errorCodes from '../constants/errorCodes';

const { USER_NOT_EXISTS, PASSWORD_NOT_VALID } = errorCodes;

const signUserWithJwt = (user) => {
  const token = signJwt(user);
  return { ...user.toJSON(), ...{ token } };
};

const registerUser = async (user) => await User.create(user);
const findByEmail = async (email) => await User.findOne({ email: email });
const findByUserName = async (username) =>
  await User.findOne({ username: username });

const authenticate = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) return Promise.reject(USER_NOT_EXISTS);

  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) return Promise.reject(PASSWORD_NOT_VALID);

  return signUserWithJwt(user);
};

const userService = {
  authenticate,
  registerUser,
  findByEmail,
  findByUserName,
};

export default userService;
