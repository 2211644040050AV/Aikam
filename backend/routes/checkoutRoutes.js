const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } =require("../middleware/authMiddleware");
const { route, checkout, checkout } = require("./cartRoutes");

const router = express.Router();

router.post("/", protect, async (req, res) => {
    const { CheckoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!CheckoutItems || CheckoutItems.length === 0) {
        return res.status(400).json({message: "no items in checkout"});
    }

    try {
        const newCheckout = await Checkout.created({
            user: req.user._id,
            CheckoutItems: CheckoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error Creating checkout session: ",error);
        res.status(500).json({message: "Server Error"});
    }
});

router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById();

        if (!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({message: "Invalid Payment Status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

router.post("/:id/finalize",protect, async (req, res) => {
    try {
        const checkout = await checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: user.checkout.user,
                orderItems: checkout.CheckoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            checkout.isFinalized = true;
            checkout.isFinalized =Date.now(),
            await checkout.save();

            await Cart.findOneAndDelete({user: checkout.user});
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({message: "Checkout already finalized"});
        } else {
            res.status(400).json({message: "Checkout is not paid"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
})

module.exports = router;