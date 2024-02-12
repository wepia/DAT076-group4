import {Account, Shift} from "../model/account";

export class AccountService {
    private accounts : Account[] = [];
    private nextAccountID : number = 1; //saving 0 if we want to implement a "trashcan id"
    private async accessAccount(accountID : number):Promise<Account>{
        let accIndex : number = this.accounts.findIndex(v => v.id === accountID);
        if(accIndex === -1){
          throw new Error("Requested accountID does not exist.");
        }
        return this.accounts[accIndex];
    }

    async getAccounts() : Promise<Account[]> {
        return JSON.parse(JSON.stringify(this.accounts));

    }

    //TODO should we make sure same username is not allowed for multiple users?
    async registerAccounts(userName : string, password : string, confirmPassword : string, email : string, gender : string, birth : string) :Promise<Account>{
        if (password != confirmPassword) {
            throw new Error("Passwords do not match!")
        }

        if (typeof userName !== 'string' || typeof password !== 'string'|| typeof confirmPassword !== 'string' || typeof email !== 'string'|| typeof gender !== 'string'|| typeof birth !== 'string') {
            throw new Error("Poor input format!")
        }

        let newAcc : Account = {
            id: this.nextAccountID++,
            userName: userName,
            password : password,
            email : email,
            gender : gender,
            birth : birth,
            shifts : []
        }

        this.accounts.push(newAcc);
        //Q: what is happening in the return statement? Why not return a JSON?
        //return JSON.parse(JSON.stringify(newAcc));
        return {...newAcc};
    }

    async scheduleShift(accountID: number, eventID: number, shiftID: number) :Promise<Account>{
        let account : Account = await this.accessAccount(accountID);
        //do not schedule a shift twice
        if(account.shifts.findIndex(s => (s.shiftID === shiftID) && (s.eventID === eventID)) === -1){
            let newShift : Shift = {
                eventID: eventID,
                shiftID: shiftID
            };
            account.shifts.push(newShift);
        }
        return JSON.parse(JSON.stringify(account));
    }
    
    async unscheduleShift(accountID: number, eventID: number, shiftID: number) :Promise<Account>{
        let account : Account = await this.accessAccount(accountID);
        let shiftIndex = account.shifts.findIndex(s => (s.shiftID === shiftID) && (s.eventID === eventID));
        if(shiftIndex > -1){
            account.shifts.splice(shiftIndex, 1);
        }
        return JSON.parse(JSON.stringify(account));
    }

}