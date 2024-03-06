import express from "express";
import cors from "cors";
import { accountRouter } from "./router/account";
import { eventRouter } from "./router/event";
import session from "express-session";


export const app = express();

app.use(express.json());
app.use(session({
    secret : "test",
    resave : false,
    saveUninitialized : true
}));
app.use(cors({
    origin: true,
    credentials : true
}));
app.use("/account", accountRouter);
app.use("/event", eventRouter);
