import mongoose from "mongoose";
/* // TODO: Uncomment only for verifying the database connection. Remove once transitioning to domain models begins.
import { User } from "../models/userModel"; */

export const connectToDatabase = async () => {
  try {
    const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

    await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,

      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    /* // Create a test user
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    }); */

    /* // Save the user to the database
    await user.save();
    console.log("Successfully created test user."); */
  } catch (error) {
    // TODO: Add logger
    console.log(error.stack);
  }
};
