import {Account} from "../model/account";

export interface IAccountService {

    //Register the account with the given account details.
    //Throws an excpetion if one of the input variables is not of the desired type.
    registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) : Promise<Account>

    //Returns true if if a user with the specified username and password exists
    //false otherwise.
    //Throws an exception if username or password is invalid.
    findAccount(username : string, password : string) : Promise<boolean>
}