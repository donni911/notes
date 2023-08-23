import User from "../models/User.js";
import { handleError } from "./helpers.js";

const registerNewUser = async (req, res) => {
  try {
    const isUserExist = await User.findOne({
      email: req.body.email,
    });

    if (isUserExist) {
      return res.status(409).json({
        errors: {
          email: {
            message: "Email already in use, try login",
          },
        },
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    let data = await user.save();
    const token = await user.generateAuthToken();

    res.status(201).json({ data, token });
  } catch (err) {
    return handleError(res, err, 422);
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserDetails = async (req, res) => {
  await res.json(req.userData);
};

export { loginUser, getUserDetails, registerNewUser };
