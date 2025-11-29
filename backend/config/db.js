import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = async () => {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGODB_URL)
=======
    await mongoose.connect(your_mongodb_url)
>>>>>>> 9c9ccdea4069f8926fc3067522643008bea962a7
    .then(()=>console.log("DB Connected"));
}
// export const connectDB = async () => {
//     await mongoose
//       .connect(
//         process.env.MONGO_URL
//       )
//       .then(() =>console.log("DB Connected"));
//   };


