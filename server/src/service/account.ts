import {Account} from "../model/account";
import { SportEvent } from "../model/sportEvent";
import { IAccountService } from "./account.interface";

export class AccountService implements IAccountService{
    findAccount(username: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAccountEvents(userName: string): Promise<SportEvent[]> {
        throw new Error("Method not implemented.");
    }
    addEvent(userName: string, eventID: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    removeEvent(userName: string, eventID: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    changeEmail(userName: string, password: string, newEmail: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    accessAccount(userName: string, password: string): Promise<Account> {
        throw new Error("Method not implemented.");
    }
    private accounts : Account[] = [];


    async registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) {      

        if (typeof userName !== 'string' || typeof password !== 'string'||  typeof email !== 'string'|| typeof gender !== 'string'|| typeof birth !== 'string') {
            throw new Error("Poor input format!")
        }

        let newAcc : Account = {
            userName: userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth,
            eventIDs : []
        }

        this.accounts.push(newAcc);
        
        return {...newAcc};
    }
}