const mongoose = require("mongoose");
const { image } = require("../config/cloudinary");
const { checkout } = require("../routes/cartRoutes");

const checkoutItemSchema = new mongoose.Schema({
    produtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qauntity: {
        type: Number,
        requires: true,
    }
}, { _id: false }
);

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    checkoutItem: [checkoutItemSchema],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        address: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    paymentStatus:{
        type: String,
        default: "pending",
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed,
    },
    isFinalized: {
        type: Boolean,
        default: false,
    },
    finalizedAt: {
        type: Date,
    },
}, { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);