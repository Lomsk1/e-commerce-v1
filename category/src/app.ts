import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { errorController } from "./controllers/errors/errorController";
import categoryRoute from "./routes/categoryRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(mongoSanitize());

app.use(helmet());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* Routes */
app.use("/api/v1/category", categoryRoute);

app.use(compression());

app.use(errorController);

export default app;
