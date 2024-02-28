import { Account } from "../model/account";
import { AccountService } from "../service/account";
import express, {Router, Request, Response} from "express";
import { IAccountService } from "../model/account.interface";

const accountService : IAccountService = new AccountService();
export const accountRouter : Router = express.Router();

accountRouter.post("/", async (
    req : Request,
    res : Response<Account | string>
) => {
    try {
        const userName : string = req.body.userName;
        const email : string = req.body.email;
        const password : string = req.body.password;
        const gender : string = req.body.gender;
        const birth : Date = req.body.birth;

        const newAcc = await accountService.registerAccounts(userName, password, email, gender, birth);
        res.status(200).send(newAcc);
    } catch (e: any) {
        res.status(400).send(e.message);
    }

} )
