import express from "express"
import { VerifyToken } from "../middlewares/auth.middlewares.js";
import { register,login } from "../controllers/User.controllers.js";

const UserRouter =express.Router();


UserRouter.route('/register').post(register)
UserRouter.route('/login').post(login)

export {UserRouter}