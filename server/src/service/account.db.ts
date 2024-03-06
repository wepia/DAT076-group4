import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel} from "../db/account.db";
import {Model} from 'mongoose';

export class AccountDBService implements IAccountService {
    getAccountEvents(userName: string): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    changeEmail(userName: string, newEmail: string): void {
        throw new Error("Method not implemented.");
    }
    accessAccount(userName: string, password: string): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    async registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date): Promise<Account> {
        
        const am : Model<Account> = await accountModel;
        return await am.create({
            userName : userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth,
            eventIDs : []
        })
    }
}