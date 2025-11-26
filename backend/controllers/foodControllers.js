// this file is for creating the api

import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item 

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: req.file.filename,
            userId: req.userId // if you want to track admin
        });

        await food.save();

        res.json({ success: true, message: "Food Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in add food" });
    }
};


// all food list
const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// rmove food item 
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            });
        }

        // delete image safely
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) console.log("Error deleting image:", err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food removed successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export {addFood,listFood,removeFood}