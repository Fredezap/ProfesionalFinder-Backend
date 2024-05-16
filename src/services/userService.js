import { User } from '../models/userModel';

const registerUser = async (user) => {
  await User.create(user);
};

const findByEmail = async (email) => await User.findOne({ email: email });

const userService = {
  registerUser,
  findByEmail,
};

export default userService;
