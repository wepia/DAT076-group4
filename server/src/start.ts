import express, { Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import { eventRouter } from "./router/event";
import { scheduleRouter } from "./router/schedule";
import { accountRouter } from "./router/account";
import * as fs from 'fs';


export const app = express();
const key = fs.readFileSync('./src/secret.txt', 'utf-8')

app.use(express.json());
app.use(session({
    secret : key,
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
