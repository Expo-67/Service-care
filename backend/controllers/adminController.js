import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Service from "../models/Service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProfile = async (req, res) => {
  res.send(req.admin);
};

export const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "avatar"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.admin[update] = req.body[update]));
    await req.admin.save();
    res.send(req.admin);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).populate("user", "username email");
    res.send(services);
  } catch (error) {
    res.status(500).send();
  }
};

export const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();
    const services = await Service.find({});
    const totalRevenue = services.reduce(
      (sum, service) => sum + (service.cost || 0),
      0
    );

    res.send({
      totalUsers,
      totalServices,
      totalRevenue,
      averageServiceCost: totalServices > 0 ? totalRevenue / totalServices : 0,
    });
  } catch (error) {
    res.status(500).send();
  }
};

export const logout = async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};
