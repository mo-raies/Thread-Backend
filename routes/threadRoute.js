import express from "express"
import { createThread, deleteThread, getAllThreads, getThreadbyId, getThreadsByUser, updateThread } from "../controllers/threadControllers.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../middleware/multer.js"

const router = express.Router()

//http://localhost:8080/api/v1/thread/createThread
router.route("/createThread").post(isAuthenticated,upload.single("imgSrc"),createThread) 
//http://localhost:8080/api/v1/thread/allthread
router.route("/allthread").get(isAuthenticated,getAllThreads) 
//http://localhost:8080/api/v1/thread/6825fe29911e24c1983d0a46
router.route('/:id').get(isAuthenticated,getThreadbyId) 
//http://localhost:8080/api/v1/thread/6825fe29911e24c1983d0a46
router.route('/:id').put(isAuthenticated,updateThread) 
//http://localhost:8080/api/v1/thread/6825fe29911e24c1983d0a46
router.route('/:id').delete(isAuthenticated,deleteThread) 
//http://localhost:8080/api/v1/thread/user/6825ca0388ea320f22365875
router.route('/user/:userId').get(isAuthenticated,getThreadsByUser) 

export default router;