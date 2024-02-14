import {Account} from "../model/account";

export class AccountService {
    private accounts : Account[] = [];

    async getAccounts() : Promise<Account[]> {
        return JSON.parse(JSON.stringify(this.accounts));

    }

    async registerAccounts(userName : string, password : string, confirmPassword : string, email : string, gender : string, birth : Date) {
        if (password != confirmPassword) {
            throw new Error("Passwords do not match!")
        }

        if (typeof userName !== 'string' || typeof password !== 'string'|| typeof confirmPassword !== 'string' || typeof email !== 'string'|| typeof gender !== 'string'|| typeof birth !== 'string') {
            throw new Error("Poor input format!")
        }

        let newAcc : Account = {
            userName: userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth
        }

        this.accounts.push(newAcc);
        
        return {...newAcc};
    }
}