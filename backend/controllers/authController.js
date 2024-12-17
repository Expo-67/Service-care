import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    //const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    req.session.user = user;
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Could not log out, please try again." });
      }
      res.send({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
