import express from "express";
import cors from "cors";
import { accountRouter } from "./router/account";
import { eventRouter } from "./router/event";


export const app = express();

app.use(express.json());
app.use(cors());
app.use("/account", accountRouter);
app.use("/event", eventRouter);
