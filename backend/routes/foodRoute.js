import express from "express"
import { addFood,listFood,removeFood} from "../controllers/foodControllers.js"
import multer from "multer"
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router(); // router is created to use get method and post method

// foodRouter.post("/add",addFood)

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),authMiddleware,addFood)
foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);

foodRouter.get("/list",listFood)
foodRouter.post("/remove",authMiddleware,removeFood);
export default foodRouter