import express from "express";
import { eventApi } from "./router/eventApi";

const cors = require('cors'); 
export const app = express();

app.use(cors());
app.use(express.json());
app.use("/event", eventApi);




