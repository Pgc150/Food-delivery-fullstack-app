import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import authMiddleware from "../middleware/auth.js";
// placing user order for frontend

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req,res) => {
    const frontend_url = "http://localhost:5173"
     try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({

            price_data:{
                currency:"inr",
                product_data : {
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})
     } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"Error"})
     }
}

const verifyOrder = async (req, res) => {
  const { sessionId, orderId } = req.body;

   if (!sessionId) {
        console.log("Session ID missing");
        return res.json({ success: false, message: "Missing sessionId" });
    }
  try {
    // Get payment info from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Payment verified" });
    }

    // If not paid, delete the order
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: false, message: "Payment failed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};



//user orders for frontend
const userOrders = async(req,res) => {
     try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
     }
}

// listing orders for admin panel
// const listOrders = async (req, res) => {
//   try {
    
//     let userData = await userModel.findById(req.body.userId);
       
//     if (userData && userData.role === "admin") {
//       const orders = await orderModel.find({});
//       res.json({ success: true, data: orders });
//     } else {
//       res.json({ success: false, message: "You are not admin" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// const updateStatus = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     if (userData && userData.role === "admin") {
//       await orderModel.findByIdAndUpdate(req.body.orderId, {
//         status: req.body.status,
//       });
//       res.json({ success: true, message: "Status Updated Successfully" });
//     }else{
//       res.json({ success: false, message: "You are not an admin" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };


const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
export  {placeOrder,verifyOrder,updateStatus,userOrders,listOrders}