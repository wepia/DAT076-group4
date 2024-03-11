import express, { Router, Request, Response } from "express";
import { Account } from "../model/account";
import { AccountDBService } from "../service/account.db";
import { IAccountService } from "../service/account.interface";
import { SportEvent } from "../model/sportEvent";

const accountService: IAccountService = new AccountDBService();
export const accountRouter: Router = express.Router();

accountRouter.post(
  "/",
  async (req: Request, res: Response<Account | string>) => {
    try {
      const userName: string = req.body.userName;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const gender: string = req.body.gender;
      const birth: Date = new Date(req.body.birth);

      const newAcc = await accountService.registerAccounts(
        userName,
        password,
        email,
        gender,
        birth
      );

      const accCopy = JSON.stringify(newAcc);
      res.status(200).send(accCopy);
    } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
    }
  }
);

interface LoginRequest extends Request{
    body : {username : string, password : string}
}

accountRouter.post(
  "/login",
  async (req: LoginRequest, res: Response<string>) => {
    try {
      if (typeof req.body.username !== "string" || typeof req.body.password !== "string" || req.body.username === "" || req.body.password === "") {
        return res.status(400).send("Invalid username or password");
      }

      if (! await accountService.findAccount(req.body.username,req.body.password)) {
        return res.status(401).send("Username or password is incorrect");
      }
        req.session.user = req.body.username;



        return res.status(200).send("Login success");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

accountRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      return res.status(200).send("successfull logout")
    });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

accountRouter.get("/", async (req: Request, res: Response<SportEvent[]>) => {
 try{
  if (req.session.user === undefined) {
    return res.status(401).send(req.session.user);
}
  const events: SportEvent[] = await accountService.getAccountEvents(
    req.session.user
  );
  return res.status(200).send(events);
} catch(e:any) {
  res.status(500).send(e.message);
}}
);

accountRouter.get("/account", async (req: Request, res: Response) => {
  if (req.session.user === undefined) {
    return res.status(401);
  }

  const acc = await accountService.accessAccount(req.session.user);
  return res.status(200).send(acc);
});

export async function schedule(user:string, eventID:string): Promise<void> {
  try {
    console.log("shedule in accountRouter");
    await accountService.addEvent(user, eventID);
  } catch (e:any) {
    console.log("Error in account-schedule: " + e.message);
    throw e;
  }
}

export async function unschedule(user:string, eventID:string): Promise<void> {
  try {
    console.log("unshedule in accountRouter");
    await accountService.removeEvent(user, eventID);
  } catch (e:any) {
    console.log("Error in account-unschedule: " + e.message);
    throw e;
  }
}


/*
accountRouter.put("/schedule", async (
  req : Request,
  res : Response
) => {
  try {
     if (req.session.user === undefined) {
      res.status(401).send("Need to be logged in");
     } else{
     const eventID : string = req.body.data.id;
     console.log("eventId: " + eventID)
     await accountService.addEvent(req.session.user, eventID)
  }} catch (e:any) {
    res.status(500).send(e.message);
  }
})

accountRouter.delete("/schedule", async (req: Request, res: Response) => {
  if (req.session.user === undefined) {
    return res.status(401);
  }
  try {
    const eventID: string = req.body.id;
    await accountService.removeEvent(req.session.user, eventID);
    return res.status(200).send("ok");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
*/