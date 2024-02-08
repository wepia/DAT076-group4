import { Account } from "../model/archived/account";
import { AccountService } from "../service/archived/account";
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
    res : Response<Array<Account> | string >
) => {
    try {
        const accounts = await accountService.getAccounts();
        res.status(200).send(accounts);
    } catch (e : any) {
        res.status(500).send(e.message);
    }
})