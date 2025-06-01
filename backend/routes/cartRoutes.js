const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Utility to get cart
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Add to Cart
router.post("/", async (req, res) => {
  const { productId, quantity = 1, guestId, userId } = req.body || {};

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: "Invalid product or quantity" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    const newItem = {
      productId: product._id,
      name: product.name,
      image: product.image?.url || "",
      price: product.price,
      quantity,
    };

    if (!cart) {
      cart = new Cart({
        user: userId || undefined,
        guestId: guestId || undefined,
        products: [newItem],
        totalPrice: product.price * quantity,
      });
    } else {
      const index = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index !== -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push(newItem);
      }

      cart.totalPrice = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
});

// Update Cart Item Quantity
router.put("/", async (req, res) => {
  const { productId, quantity, guestId, userId } = req.body || {};

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity > 0) {
      cart.products[index].quantity = quantity;
    } else {
      cart.products.splice(index, 1); // Remove item if quantity is 0
    }

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Item from Cart
router.delete("/", async (req, res) => {
  const { productId, guestId, userId } = req.body || {};

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Cart
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Merge Guest Cart with Authenticated User Cart
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!guestCart || guestCart.products.length === 0) {
      return res.status(404).json({ message: "Guest cart is empty or not found" });
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const index = userCart.products.findIndex(
          (item) => item.productId.toString() === guestItem.productId.toString()
        );

        if (index !== -1) {
          userCart.products[index].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await userCart.save();
      await Cart.findOneAndDelete({ guestId });

      return res.status(200).json(userCart);
    } else {
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;

      await guestCart.save();
      return res.status(200).json(guestCart);
    }
  } catch (error) {
    console.error("Error merging cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
