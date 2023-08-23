import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};
