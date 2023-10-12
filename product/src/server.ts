import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT REJECTION! Shutting down...");
  process.exit(1);
});
const start = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_AUTH_URI!, {
        dbName: "product",
      })
      .then(() => console.log("DB success"))
      .catch((e) => console.log(e));
  } catch (err) {
    console.error(err);
  }
};
const port = process.env.PORT || 8003;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

start();
