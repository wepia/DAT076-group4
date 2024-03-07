import {Schema, Model} from "mongoose";
import {Account} from "../model/account";
import {conn} from "./conn";
import { ObjectId } from "mongodb";

const accountSchema : Schema = new Schema ({
    userName : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        required : true
    },

    birth : {
        type : Date,
        required : true
    },

    events : [{
        type : ObjectId,
        ref : "Events"
}]
});


async function makeModel() : Promise<Model<Account>> {
    return (await conn).model<Account>("Accounts", accountSchema);
}

export const accountModel : Promise<Model<Account>> = makeModel();