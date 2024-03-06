import {Account} from "../model/account";

export interface IAccountService {
    //Register the account with the given account details.
    //Throws an excpetion if one of the input variables is not of the desired type.
    registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) :Promise<Account>

    //Returns the list of event-ids for this account
    getAccountEvents(userName : string) :Promise<number[]> 

    //Changes the email for this account
    changeEmail(userName : string, newEmail: string) : void

    //Access an account through username + password
    //Returns a deep copy of the account if the name and password matches
    accessAccount(userName : string, password : string) : Promise<Account>
}