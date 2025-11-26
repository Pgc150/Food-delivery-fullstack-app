import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://payalchavhan180_db_user:30052003@cluster2.vs0vi1u.mongodb.net/Test-Project')
    .then(()=>console.log("DB Connected"));
}
// export const connectDB = async () => {
//     await mongoose
//       .connect(
//         process.env.MONGO_URL
//       )
//       .then(() =>console.log("DB Connected"));
//   };

