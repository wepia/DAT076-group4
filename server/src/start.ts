import express from "express";
import { accountRouter } from "./router/account";

export const app = express();

app.use(express.json());
app.use("/account", accountRouter);