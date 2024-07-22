import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// CORS middleware configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL], // Allow requests from your frontend domain
  methods: ["GET", "PUT", "POST", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials to be sent
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// Connect to MongoDB or any other database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
