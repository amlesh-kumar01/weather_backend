import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import usersRouter from "./routes/users.js";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

// To connect to MongoDB Atlas
const uri = process.env.ATLAS_URI;
connect(uri)
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    console.error("Stack trace:", err.stack);
  });

// Use the users router
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
