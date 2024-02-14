import express from "express";
import { accountRouter } from "./router/account";
import { eventApi } from "./router/eventApi";
import cors from "cors";


export const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());
app.use("/account", accountRouter);
app.use("/event", eventApi);
