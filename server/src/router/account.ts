import { Account } from "../model/account";
import { AccountDBService } from "../service/account.db";
import express, {Router, Request, Response} from "express";
import { IAccountService } from "../service/account.interface";
import { SportEvent } from "../model/sportEvent";

const accountService : IAccountService = new AccountDBService();
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
        const birth : Date = new Date(req.body.birth);

        const newAcc = await accountService.registerAccounts(userName, password, email, gender, birth);
        res.status(200).send(newAcc);
    } catch (e: any) {
        console.error(e);
        res.status(500).send(e.message);
    }

} )

interface LoginRequest extends Request {
    session : any,
    body : {username : string, password : string}
}

accountRouter.post("/login", async (
    req : LoginRequest,
    res : Response<string>
    ) => {
        try {
            if (typeof(req.body.username) !== "string" || typeof(req.body.password) !== "string" 
            || req.body.username === "" || req.body.password === "") {
                return res.status(400).send("Invalid username or password")
            }

            if (!await accountService.findAccount(req.body.username, req.body.password)) {
                return res.status(401).send("Username or password is incorrect")
            }
                       
            return res.status(200).send("Login success")
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }
)

accountRouter.get("/", async ( 
    req: Request,
    res: Response<String[]>
) => {
    try{
        if(req.cookies.session.user === undefined) {
            res.status(401);
        }

        const events : string[] = await accountService.getAccountEvents(req.cookies.session.user);
        res.status(200).send(events);
    } catch(e:any) {
        res.status(500).send(e.message);
    }
})