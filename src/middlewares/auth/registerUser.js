import { StatusCodes } from 'http-status-codes';

import userService from '../../services/userService';

const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    res.status(StatusCodes.OK).send(user);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default registerUser;
