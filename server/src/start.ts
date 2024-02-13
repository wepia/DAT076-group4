import express from "express";
import { accountRouter } from "./router/account";
import { eventApi } from "./router/eventApi";

export const app = express();

app.use(express.json());
app.use("/account", accountRouter);
app.use("/event", eventApi);
