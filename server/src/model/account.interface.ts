import {Account} from "./account";


export interface IAccountService {

    //Register the account with the given account details.
    //Throws an excpetion if one of the input variables is not of the desired type.
    registerAccounts(userName : string, password : string,  email : string, gender : string, birth : Date) : Promise<Account>
}