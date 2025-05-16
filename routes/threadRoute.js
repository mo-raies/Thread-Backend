import express from "express"
import { createThread } from "../controllers/threadControllers.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

//http://localhost:8080/api/v1/thread/createThread
router.route("/createThread").post(isAuthenticated,createThread) 

export default router;