import userModel from "../models/userModel.js"

// add items to user cart 
 const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // ⬅ Get from middleware
    const itemId = req.body.itemId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Item added to cart",
    });

  } catch (error) {
    console.log("Error in add to cart", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};



// remove items form user cart
 const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    // const itemId  = req.body.itemId;
      const { itemId } = req.body;
    console.log("Token userId:", req.userId);
    console.log("Incoming itemId:", req.body.itemId);


    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData;

    console.log("User cart:", userData.cartData);

    // If item does not exist
    if (!cartData[itemId]) {
      return res.json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // If item exists → decrease quantity
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    } else {
      // If quantity was 1 → remove item completely
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    console.log("Error in removeFromCart", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};


// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData,
    });

  } catch (error) {
    console.log("Error in getCart", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};



export {addToCart,removeFromCart,getCart}