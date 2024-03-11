import express, { Request, Response } from "express";
//import express, { Request, Response, NextFunction, Router } from "express";
import session from "express-session";
import cors from "cors";
import { accountRouter, schedule as accountSchedule, unschedule as accountUnschedule, schedule } from "./router/account";
import { eventRouter, schedule as eventSchedule, unschedule as eventUnschedule } from "./router/event";


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
app.put("/schedule", async (
    req : Request,
    res : Response
  ) => {
    try {
        if (req.session.user === undefined) {
            console.log("user is undefined");
            res.status(401).send("Need to be logged in");
        } else {
            const user = req.session.user;
            const eventID: string = req.body.data.id;
            console.log("Scheduling event: " + eventID + " to user: " + user);

            await accountSchedule(user,eventID);
            await eventSchedule(user,eventID);

            res.status(200).send("Schedule successful");
        }
    } catch (error) {
        //TODO undo any half-scheduling?
        console.error("Error scheduling event:", error);
        res.status(500).json({ error: "Error scheduling event" });
    }
});

app.delete("/schedule", async (
    req : Request,
    res : Response
  ) => {
    try {
        if (req.session.user === undefined) {
            console.log("user is undefined");
            res.status(401).send("Need to be logged in");
        } else {
            const user = req.session.user;
            const eventID: string = req.body.data.id;
            console.log("Scheduling event: " + eventID + " to user: " + user);

            await accountUnschedule(user,eventID);
            await eventUnschedule(user,eventID);

            res.status(200).send("Schedule successful");
        }
    } catch (error) {
        //TODO undo any half-scheduling?
        console.error("Error scheduling event:", error);
        res.status(500).json({ error: "Error scheduling event" });
    }
});

