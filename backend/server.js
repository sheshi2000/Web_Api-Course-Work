const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const driverRoutes = require("./routes/driverRoutes");
const accountRoutes = require("./routes/accountRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const swaggerDocs = require("./config/swaggerConfig");
const swaggerUi = require('swagger-ui-express');

require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/drivers", driverRoutes); // Driver routes
app.use("/api/accounts", accountRoutes); // Account routes
app.use("/uploads", express.static("uploads")); // Static folder for uploaded images
app.use("/api/feedbacks", feedbackRoutes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err.message);
    });

// Start Server
const PORT = process.env.PORT || 5000;  // Use PORT from Cloud Run or fallback to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
