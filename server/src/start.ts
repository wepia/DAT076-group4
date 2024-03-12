import express, { Request, Response } from "express";
//import express, { Request, Response, NextFunction, Router } from "express";
import session from "express-session";
import cors from "cors";
import { eventRouter } from "./router/event";
import { scheduleRouter } from "./router/schedule";
import { accountRouter } from "./router/account";


export const app = express();

app.use(express.json());
app.use(session({
    secret : "test",
    resave : false,
    saveUninitialized : false
}));
app.use(cors({
    origin: true,
    credentials : true
}));
app.use("/account", accountRouter);
app.use("/event", eventRouter);


//Schedule/unschedule volunteers on events, to be done in both events and accounts
//for now you can only schedule/unschedule yourself, maybe later add possibility to unschedule someone else from an event you own?
app.use("/schedule", scheduleRouter)
