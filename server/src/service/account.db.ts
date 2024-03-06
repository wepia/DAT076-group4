import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel} from "../db/account.db";
import {Model} from 'mongoose';

export class AccountDBService implements IAccountService {

    async registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date): Promise<Account> {
        
        const am : Model<Account> = await accountModel;
        return await am.create({
            userName : userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth
        })
    }

    async findAccount(username: string, password: string): Promise<boolean> {
        const am : Model<Account> = await accountModel;
        const user = await am.findOne({userName : username})
        if (user?.password === password) {
            return true
        } else {
            return false
        }
    }
}