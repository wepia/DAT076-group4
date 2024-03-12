import express, { Router, Request, Response } from "express";
import { Account } from "../model/account";
import { AccountDBService } from "../service/account.db";
import { IAccountService } from "../service/account.interface";
import { SportEvent } from "../model/sportEvent";
import bcrypt from 'bcrypt';

const accountService: IAccountService = new AccountDBService();
export const accountRouter: Router = express.Router();


// Registers the new account 
accountRouter.post(
  "/",
  async (req: Request, res: Response<string>) => {
    try {
      const userName: string = req.body.userName;
      const email: string = req.body.email;
      const password: string = req.body.password;
      const gender: string = req.body.gender;
      const birth: Date = new Date(req.body.birth);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
       await accountService.registerAccounts(
        userName,
        hashedPassword,
        email,
        gender,
        birth
      );
      res.status(200).send("ok")
    } catch (e: any) {
      console.error(e);
      res.status(500).send(e.message);
    }
  }
);

interface LoginRequest extends Request{
    body : {username : string, password : string}
}

// Logs into the user with the specified username and password
// Return status 401 if the username or password doesn't 
// match with an registered account.
accountRouter.post(
  "/login",
  async (req: LoginRequest, res: Response<string>) => {
    try {
      if (((typeof req.body.username) !== "string") || ((typeof req.body.password) !== "string") || (req.body.username === "") || (req.body.password === "")) {
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

// Logs out the user by destroying the session.
accountRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      return res.status(200).send("successfull logout")
    });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});


// Returns the list of events with a 200 respons if successfull
// otherwise returns with status 500
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

// Returns the account data of the user with a status 200 response.
// If the user is not logged in, returns a status 401.
accountRouter.get("/account", async (req: Request, res: Response) => {
  if (req.session.user === undefined) {
    console.log(req.session)
    return res.status(401).send("need to login")
  }

  const acc = await accountService.getAccountData(req.session.user);
  return res.status(200).send(acc);
});


// Filters the events of the users signed up events with status 200.
// If the user is not logged in, return response with status 401.
accountRouter.put("/", async (
  req : Request,
  res : Response
) => {
  try {
    if(req.session.user === undefined) {
       res.status(401).send("Need to be logged in");
    } else{
  const startDate : Date = req.body.startDate;
  const endDate : Date = req.body.endDate;
  const events = await accountService.filterEvents(req.session.user,startDate,endDate);

  res.status(200).send(events);
    }

  } catch(e:any) {
      res.status(500).send(e.message);
  }
})




