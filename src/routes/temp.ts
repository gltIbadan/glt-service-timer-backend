import express from "express";
import { guestMiddleware } from "../middlewares/guest.ts";
import { createTempTimer, getAllTempTimer, getTempTimer } from "../controllers/timerController.ts";


const tempRouter = express.Router();

tempRouter.use(guestMiddleware);

tempRouter.post("/timer/create", createTempTimer);
tempRouter.get("/timer/all", getAllTempTimer);
tempRouter.get("/timers/:id", getTempTimer);




export default tempRouter;