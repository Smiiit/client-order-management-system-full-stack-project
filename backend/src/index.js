const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const clientRoutes = require("./routes/clients");
const productRoutes = require("./routes/products");
const orderCommentRoutes = require("./routes/orderComments");
const orders = require("./routes/orders");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order-comments", orderCommentRoutes);
app.use("/api/orders", orders);

app.get("/", (req, res) => res.json({ message: "API up" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
