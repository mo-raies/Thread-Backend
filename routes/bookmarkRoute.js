import express from "express"
import { bookmark } from "../controllers/bookmarkControllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/:threadId").post(isAuthenticated,bookmark)

export default router;