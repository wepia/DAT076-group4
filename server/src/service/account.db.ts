import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel } from "../db/account.db";
import { Model } from "mongoose";
import { SportEvent } from "../model/sportEvent";
import { eventModel } from "../db/event.db";

export class AccountDBService implements IAccountService {
  
  
  async addEvent(userName: string, event: SportEvent): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      console.log("user not found")
      return false;
    }

    user.events.push(event);
    await user.save();

    return true;
  }

  async removeEvent(userName: string, event: SportEvent) : Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      console.log("No user with that username");
      return false;
    }
    user.populate("events");

    const index = user.events.findIndex((event) => event.id.toString() === event.id.toString());
    if (index !== -1) {
      user.events.splice(index, 1);
      await user.save();
      return true;

  } else {
      console.log("Event not found in user's events");
      return false;
  }

  }

  async getAccountEvents(userName: string): Promise<[SportEvent]> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    if (user === null) {
      throw "No user with username " + userName;
    }
    
    user.populate("events");
    const events = user.events;

    return events;
    
    
  }


  async changeEmail(
    userName: string,
    password: string,
    newEmail: string
  ): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password });

    if (user === null) {
      return false;
    }

    user.email = newEmail;
    await user.save();

    return true;
  }

  async accessAccount(userName: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName});

    if (user === null) {
      throw new Error("Password don't match with the username");
    }

    const userCopy = JSON.parse(JSON.stringify(user));

    return userCopy;
  }

  async registerAccounts(
    userName: string,
    password: string,
    email: string,
    gender: string,
    birth: Date
  ): Promise<Account> {
    const am: Model<Account> = await accountModel;

    // Check if an account with the same userName already exists
    const existingAccount = am.findOne({ userName });
    if (await existingAccount) {
        throw new Error("An account with the same userName already exists");
    }

    return await am.create({
      userName: userName,
      password: password,
      email: email,
      gender: gender,
      birth: birth,
      eventIDs: [],
    });
  }

  async findAccount(username: string, password: string): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: username });
    if (user?.password === password) {
      return true;
    } else {
      return false;
    }
  }
}
