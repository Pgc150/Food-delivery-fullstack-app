import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";



// Create a JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
console.log("JWT SECRET VALUE:", process.env.JWT_SECRET);


// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    if(!name || !email || !password) {
        return res.status(300).json({sucess:false,message:"All fields are required"})
    }
    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const user = await newUser.save();

        // Generate a token
        const token = createToken(user._id);

        // Send response
        res.status(201).json({ success: true, token ,mesaage:"signup sucessfully"});
    } catch (error) {
        console.error("Error in signup",error.message);
        res.status(500).json({ success: false, message: "Error in signup" });
    }
};

// login user
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({sucess:false,message:"User Doesn't Exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
        // res.json({sucess:true,token})
    } catch (error) {
        console.log("error in login",error);
        res.json({success:false,message:"error"})
    }
}

export { registerUser ,loginUser};
