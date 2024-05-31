import { User } from '../models/userModel';

const registerUser = async (user) => await User.create(user);
const findByEmail = async (email) => await User.findOne({ email: email });
const findByUserName = async (username) =>
  await User.findOne({ username: username });

const userService = {
  registerUser,
  findByEmail,
  findByUserName,
};

export default userService;
