import { Account } from "../model/account";
import { IAccountService } from "./account.interface";
import { accountModel } from "../db/account.db";
import { Model } from "mongoose";
import { SportEvent } from "../model/sportEvent";
import { eventModel } from "../db/event.db";

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

  //Adds an event to the event list in the Account model.
  //Throws error is the specified eventID is not associated with an event
  // Or if the username does not associate with a registered Account.
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

  // Removes the event with the eventID from the list of events if the Accounts model.
  // Throws error if the eventID do not correspond to a registered event
  // or if the username doesn't associate with any registered Accounts
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

  // Returns all the events that are inside the events field in the Account.
  // Throws error if there is no registered account with the given username
  async getAccountEvents(userName: string): Promise<SportEvent[]> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName }).populate("events");
    
    if (!user) {
      throw new Error("No user with username " + userName);
    }
    
   
    const events = user.events;

    return events;  
  }

  // Changes the accounts current email to the newEmail.
  // Returns true if the email changed successfully
  // Returns false is no registered account is associated with the 
  // combination of the given username and password.
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

  // Returns the account details of the account.
  // Throws error if no registered account has the given
  // combination of the username and password. 
  async accessAccount(userName: string, password: string): Promise<Account> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: userName, password: password});

    if (!user) {
      throw new Error("Password don't match with the username");
    }

    const userCopy = JSON.parse(JSON.stringify(user));

    return userCopy;
  }

  // Creates an account with the given account specifications.
  // Throws an error if the username, password or email already
  // exists in another account. 
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

  // Returns true if the method successfully located the account with the 
  // specified username. 
  // If no account is located, it return false.
  async findAccount(username: string, password: string): Promise<boolean> {
    const am: Model<Account> = await accountModel;
    const user = await am.findOne({ userName: username });
    if (user?.password === password) {
      return true;
    } else {
      return false;
    }
  }

  // Filtering the events, for which the account is signed up for, that are within
  // the startDate and endDate.
  async filterEvents(userName : string, startDate : Date, endDate : Date) : Promise<SportEvent[]> {
    const am : Model<Account> =  await accountModel;
    console.log("inside the filterEvents in account")
    const user = await am.findOne({ userName: userName }).populate("events");
    if(user === null) {
      throw("Couldn't locate the user")
    }
    const parsedStartDate : Date = new Date(startDate);
    const parsedEndDate : Date = new Date(endDate);
    const events = user.events;
    console.log("events are: " + events)
    
    const filteredEvents : SportEvent[] = user.events.filter(event => event.date >= parsedStartDate && event.date <= parsedEndDate )


    return filteredEvents;
  }
}