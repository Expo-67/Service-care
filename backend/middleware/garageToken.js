import jwt from "jsonwebtoken";

const garageToken = (req, res, next) => {
  const token = req.cookies.garageToken || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log({ user: req.user });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default garageToken;
