import express from "express"
import {login, logout, register} from "../controllers/userControllers.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router()

router.route("/register").post(register) //http://localhost:8080/api/v1/user/register
router.route("/login").post(login);     //http://localhost:8080/api/v1/user/login
router.route("/logout").post(isAuthenticated,logout);   //http://localhost:8080/api/v1/user/logout
export default router;