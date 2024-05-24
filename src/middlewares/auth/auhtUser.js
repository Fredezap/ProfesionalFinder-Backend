import { UnauthorizedError } from 'express-jwt';
import { StatusCodes } from 'http-status-codes';

import userService from '../../services/userService';

const authUser = async (req, res, next) => {
  try {
    const user = await userService.authenticate(req.body);
    return res.status(StatusCodes.OK).send(user);
  } catch (err) {
    return next(
      new UnauthorizedError(StatusCodes.UNAUTHORIZED, { message: err }),
    );
  }
};

export default authUser;
