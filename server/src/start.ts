import express from "express";
import { accountRouter } from "./router/account";
import { eventApi } from "./router/eventApi";

const cors = require('cors'); 
export const app = express();

app.use(cors());
app.use(express.json());
app.use("/account", accountRouter);
app.use("/event", eventApi);