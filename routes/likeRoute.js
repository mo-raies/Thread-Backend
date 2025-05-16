import express from "express"

import isAuthenticated from "../middleware/isAuthenticated.js"
import { getLikesByThread, likeOrDislike} from "../controllers/likeControllers.js";

const router = express.Router()

router.route("/:threadId").get(isAuthenticated,getLikesByThread)
// router.route("/:threadId").get(isAuthenticated,toggleLike)
router.route("/:threadId").post(isAuthenticated,likeOrDislike)

export default router;