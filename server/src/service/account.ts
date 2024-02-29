import {Account} from "../model/account";
import { IAccountService } from "../model/account.interface";

export class AccountService implements IAccountService{
    private accounts : Account[] = [];


    async registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) {      

        if (typeof userName !== 'string' || typeof password !== 'string'||  typeof email !== 'string'|| typeof gender !== 'string'|| typeof birth !== 'string') {
            throw new Error("Poor input format!")
        }

        let newAcc : Account = {
            userName: userName,
            password: password,
            email: email,
            gender: gender,
            birth: birth,
            events: []
        }

        this.accounts.push(newAcc);
        
        return {...newAcc};
    }
}