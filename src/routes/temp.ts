import express from "express";
import { guestMiddleware } from "../middlewares/guest.ts";
import { createTempTimer } from "../controllers/timerController.ts";


const tempRouter = express.Router();

tempRouter.use(guestMiddleware);

tempRouter.post("/timer/create", createTempTimer);



export default tempRouter;