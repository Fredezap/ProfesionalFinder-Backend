import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
export const MIN_PASSWORD_LENGTH = 5;
export const MIN_USERNAME_LENGTH = 2;
export const USER_NAME_FIELD_NAME = 'username';
export const EMAIL_FIELD_NAME = 'email';
export const PASSWORD_FIELD_NAME = 'password';
export const STATE_FIELD_NAME = 'state';
export const CITY_FIELD_NAME = 'city';
export const ADDRESS_FIELD_NAME = 'address';
export const POSTAL_CODE_FIELD_NAME = 'postalCode';
export const TOKEN = 'token';
export const VERIFICATION_TOKEN = 'verificationToken';
export const IS_VERIFYED = 'isVerifyed';

const UserModel = new Schema({
  [USER_NAME_FIELD_NAME]: {
    type: String,
    required: true,
    minlength: MIN_USERNAME_LENGTH,
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
  [STATE_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [CITY_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [ADDRESS_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [POSTAL_CODE_FIELD_NAME]: {
    type: String,
    required: true,
  },
  [TOKEN]: {
    type: String,
    required: true,
  },
  [VERIFICATION_TOKEN]: {
    type: String,
    required: false,
  },
  [IS_VERIFYED]: {
    type: Boolean,
    required: true,
    default: false,
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

UserModel.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

export const User = mongoose.model('User', UserModel);
