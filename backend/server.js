// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
const connectDB = async () => {
  console.log("Attempting to connect to database...");
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to database: ", error.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Call the database connection function
connectDB();

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Server is running and connected to the database!");
});

// Placeholder for additional routes
// Example: app.use("/api/reviews", require("./routes/reviews"));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});