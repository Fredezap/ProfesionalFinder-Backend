import mongoose from "mongoose";

const { Schema } = mongoose;
export const MIN_PASSWORD_LENGTH = 5;

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
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

export const User = mongoose.model("User", UserModel);
