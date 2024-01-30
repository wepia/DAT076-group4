import express from "express";
import { eventApi } from "./router/eventApi";

export const app = express();

app.use(express.json());
app.use("/event", eventApi);