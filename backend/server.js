const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // lowercase 'c'
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const contactusRoutes = require("./routes/contactusRoutes");
const cartRoutes = require("./routes/cartRoutes");
// const checkoutRoutes = require("./routes/checkoutRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const productAdminRoutes = require("./routes/productAdminRoutes");
// const adminOrderRoutes = require("./routes/adminOrderRoutes");

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/contactUs", contactusRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/checkout", checkoutRoutes);
// app.use("/api/order", orderRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
// app.use("/api/admin/products", productAdminRoutes);
// app.use("/api/admin/orders", adminOrderRoutes );

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
