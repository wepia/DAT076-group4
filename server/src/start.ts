import express from "express";
import { accountRouter } from "./router/account";
import { eventApi } from "./router/sportEvent";

export const app = express();

app.use(express.json());
app.use("/account", accountRouter);
app.use("/event", eventApi);