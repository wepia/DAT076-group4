import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel } from "../db/account.db";
import { Model } from "mongoose";
import { SportEvent } from "../model/sportEvent";
import { eventModel } from "../db/event.db";
import bcrypt from 'bcrypt';

export class AccountDBService implements IAccountService {
  async getAccountData(userName: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName });

    // Make a deep copy of the user object
    const userCopy: Account = JSON.parse(JSON.stringify(user));

    // Censor sensitive information
    userCopy.password = "********";

    return userCopy;
  }

  async addEvent(userName: string, eventID: string): Promise<void> {
    const am: Model<Account> = await accountModel;
    const em: Model<SportEvent> = await eventModel;

    // Find the user
    const user = await am.findOne({ userName: userName });
    if (!user) {
        throw new Error("User not found");
    }

    // Find the event
    const event = await em.findOne({ id: eventID });
    if (!event) {
        throw new Error("Event not found");
    }

    // event should only be added to the accounts event-list once
    const updatedAccount = await am.findByIdAndUpdate(
      user._id,
      { $addToSet: { events: event._id } },
      { new: true, safe: true }
    );

    if (!updatedAccount) {
      throw new Error("Failed to update eventlist");
    }
}

  async removeEvent(userName: string, eventID: string) : Promise<void> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName }).populate("events");;

    if (!user) {
      throw("Couldn't find user");
    }
 
    const index = user.events.findIndex((event : SportEvent) => event.id === eventID);
    if (index !== -1) {
      user.events.splice(index, 1);
    }
    await user.save();
  }

  async getAccountEvents(userName: string): Promise<SportEvent[]> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName }).populate("events");
    
    if (!user) {
      throw new Error("No user with username " + userName);
    }
    
   
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

  async accessAccount(userName: string, password: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password});

    if (!user) {
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
    if (user !== null) {
      return await bcrypt.compare(password, user.password);
    } else {
      return false;
    }
  }
}
