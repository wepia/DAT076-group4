import {Account} from "../model/account";
import { SportEvent } from "../model/sportEvent";

export interface IAccountService {
    //Register the account with the given account details.
    //Throws an excpetion if one of the input variables is not of the desired type.
    registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) : Promise<Account>

    //Returns true if if a user with the specified username and password exists
    //false otherwise.
    //Throws an exception if username or password is invalid.
    findAccount(username : string, password : string) : Promise<boolean>

    //Returns the list of event-ids for this account
    getAccountEvents(userName : string) :Promise<string[]> 

    //Add an event to the account's eventlist
    addEvent(userName : string, eventID : string): Promise<void>

    //Remove an event from the account's eventlist
    removeEvent(userName : string, eventID :string): Promise<void>

    //Changes the email for this account if the correct password is passed
    changeEmail(userName : string, password : string, newEmail: string) : Promise<boolean>

    //Access an account through username + password
    //Returns a deep copy of the account if the name and password matches
    accessAccount(userName : string, password : string) : Promise<Account>
}