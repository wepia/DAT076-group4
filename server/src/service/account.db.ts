import { Account } from "../model/account";
import { IAccountService } from "../model/account.interface";
import { accountModel} from "../../db/account.db";
import {Model} from 'mongoose';

class AccountDBService implements IAccountService {

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
}