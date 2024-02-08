import {Account, Shift} from "../model/account";

export class AccountService {
    private accounts : Account[] = [];

    async getAccounts() : Promise<Account[]> {
        return JSON.parse(JSON.stringify(this.accounts));

    }

    //TODO should we make sure same username is not allowed for multiple users?
    async registerAccounts(userName : string, password : string, confirmPassword : string, email : string, gender : string, birth : string) {
        if (password != confirmPassword) {
            throw new Error("Passwords do not match!")
        }

        if (typeof userName !== 'string' || typeof password !== 'string'|| typeof confirmPassword !== 'string' || typeof email !== 'string'|| typeof gender !== 'string'|| typeof birth !== 'string') {
            throw new Error("Poor input format!")
        }

        let newAcc : Account = {
            id: Date.now(),
            userName: userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth,
            shifts : []
        }

        this.accounts.push(newAcc);
        
        return {...newAcc};
    }
}