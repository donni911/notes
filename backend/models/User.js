import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: [true, "Please include your name."] },
  email: {
    type: String,
    required: [true, "Please include your email."],
  },
  password: {
    type: String,
    required: [true, "Please include your password."],
    minlength: [6, "Password should be at least 6 characters long."], // Add this line
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//this method will hash the password before saving the user model
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    "secret",
    {
      expiresIn: "24h",
    }
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

//this method search for a user by email and password.
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid login details");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
