import jwt from 'jsonwebtoken';

export const signJwt = (payload) => {
  const token = jwt.sign(payload.toJSON(), process.env.JWT_SECRET);
  return token;
};

const jwtUtil = {
  signJwt,
};

export default jwtUtil;
