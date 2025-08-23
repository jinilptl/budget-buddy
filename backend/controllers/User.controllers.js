import {User as UserModel} from "../models/User.models.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

export const register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("name is ", name);
  console.log("email is ", email);
  console.log("password is ", password);

  // check fields
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  let user = await UserModel.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  user = await UserModel.create({ name, email, password: hashedPassword });

  const userfind = await UserModel.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, { user: userfind }, "User registered successfully"));
});


export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check fields
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  // generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(new ApiResponse(200, { token }, "Login successful"));
});
