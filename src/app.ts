import express from "express";
import { startNow } from "./controllers/authenticationController.ts";

const app = express();

app.use(express.json());

app.get("/startNow", startNow);

export default app;
