const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const contactusRoutes = require("./routes/contactusRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes); 
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/contactUs", contactusRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
