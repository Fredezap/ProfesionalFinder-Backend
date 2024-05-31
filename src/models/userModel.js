import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
export const MIN_PASSWORD_LENGTH = 5;
export const USER_NAME_FIELD_NAME = 'username';
export const EMAIL_FIELD_NAME = 'email';
export const PASSWORD_FIELD_NAME = 'password';

const UserModel = new Schema({
  [USER_NAME_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [EMAIL_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [PASSWORD_FIELD_NAME]: {
    type: String,
    required: true,
    minlength: MIN_PASSWORD_LENGTH,
  },
});

UserModel.methods.toJSON = function toJSON() {
  const User = this.toObject({ versionKey: false });
  delete User.password;
  return User;
};

UserModel.pre('save', async function save(next) {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

export const User = mongoose.model('User', UserModel);
