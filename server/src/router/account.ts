import { Account } from "../model/account";
import { AccountService } from "../service/account";
import express, {Router, Request, Response} from "express";

const accountService : AccountService = new AccountService();
export const accountRouter : Router = express.Router();

accountRouter.post("/", async (
    req : Request,
    res : Response<Account | string>
) => {
    try {
        const userName : string = req.body.userName;
        const email : string = req.body.email;
        const password : string = req.body.password;
        const confirmPassword : string = req.body.confirmPassword;
        const gender : string = req.body.gender;
        const birth : string = req.body.birth;

        const newAcc = await  accountService.registerAccounts(userName, password, confirmPassword, email, gender, birth);
        res.status(200).send(newAcc);
    } catch (e: any) {
        res.status(400).send(e.message);
    }

} )

accountRouter.get("/", async (
    req : Request, 
    res : Response<Account[] | string >
) => {
    try {
        const accounts = await accountService.getAccounts();
        res.status(200).send(accounts);
    } catch (e : any) {
        res.status(500).send(e.message);
    }
})

accountRouter.put("/schedule", async (
    req : Request, 
    res : Response<Account | string >
) => {
    try {
        const accountID: number = req.body.accountID; 
        const eventID: number = req.body.eventID; 
        const shiftID: number = req.body.shiftID;

        const updatedAcc = await accountService.scheduleShift(accountID, eventID, shiftID);
        res.status(200).send(updatedAcc);
    } catch(e : any){
        res.status(500).send(e.message);
    }
})

accountRouter.put("/unschedule", async (
    req : Request, 
    res : Response<Account | string >
) => {
    try {
        const accountID: number = req.body.accountID; 
        const eventID: number = req.body.eventID; 
        const shiftID: number = req.body.shiftID;

        const updatedAcc = await accountService.unscheduleShift(accountID, eventID, shiftID);
        res.status(200).send(updatedAcc);
    } catch(e : any){
        res.status(500).send(e.message);
    }
})