import express from "express";
import { startNow } from "./controllers/authenticationController.ts";
import { guestMiddleware } from "./middlewares/guest.ts";
import cookieParser from 'cookie-parser';
import tempRouter from "./routes/temp.ts";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/temp", tempRouter);
app.get("/startNow", guestMiddleware, startNow);

export default app;
