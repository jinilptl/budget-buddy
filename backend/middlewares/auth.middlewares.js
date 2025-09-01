import jwt from "jsonwebtoken";
import "dotenv/config";
import ApiError from "../utils/ApiError.js";

const VerifyToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, "Unauthorized"));
    }

    console.log("decode token is ", decoded);

    req.user = decoded;

    next();
  });
};

export { VerifyToken };
