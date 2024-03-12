import * as SuperTest from "supertest";
import express, { Router, Request, Response } from "express";
import {app} from "./start";
import {Account} from "./model/account";

jest.mock("./db/conn");
const request = SuperTest.default(app);

beforeAll(async () => {
    //Register a test account

    //Create a test event

});

test("Account-routing", async() =>{
    const testuserName: string = "testname";
    const testemail: string = "test@e.mail";
    const testpassword: string = "testPassword";
    const testgender: string = "testGender";
    const testbirth: Date = new Date("1970-01-20");

    //Registration ok
    const res1 = await request.post("/account").send({userName : testuserName, password : testpassword, email : testemail, gender : testgender, birth : testbirth});
    const responseBody1 = JSON.parse(res1.text);
    
    expect(res1.statusCode).toEqual(200);
    
    expect(responseBody1.userName).toEqual(testuserName);
    //expect(res1.body.password).toEqual(testpassword);
    expect(responseBody1.email).toEqual(testemail);
    expect(responseBody1.gender).toEqual(testgender);
    expect(new Date(responseBody1.birth)).toEqual(testbirth);

    //login with wrong username or password
    const res2 = await request.post("/account/login").send({username : "notausername", password : testpassword});
    const res3 = await request.post("/account/login").send({username : testuserName, password : "wrongpassword"});
    expect(res2.statusCode).toEqual(401);
    expect(res3.statusCode).toEqual(401);
    expect(res2.text).toEqual("Username or password is incorrect");
    expect(res3.text).toEqual("Username or password is incorrect");

    //login with correct username and password
    const res4 = await request.post("/account/login").send({username : testuserName, password : testpassword});
    expect(res4.statusCode).toEqual(200);
    expect(res4.text).toEqual("Login success");
/*
    //Get account information
    const res5 = await request.get("/account/account");
    expect(res5.statusCode).toEqual(200);
    expect(res5.body.userName).toEqual(testuserName);
    expect(res5.body.email).toEqual(testemail);
    expect(res5.body.gender).toEqual(testgender);
    expect(new Date(res5.body.birth)).toEqual(testbirth);

    //Get eventlist (should be empty)
    const res6 = await request.get("/account");
    expect(res6.statusCode).toEqual(200);
    expect(res6.body).toEqual([]);

    //logout
    const res7 = await request.post("/account/logout");
    expect(res7.statusCode).toEqual(200);
    expect(res7.body).toEqual("successfull logout");

    //Try to access functions logged out
    const res8 = await request.get("/account/account");
    expect(res8.statusCode).toEqual(401);
    const res9 = await request.get("/account");
    expect(res9.statusCode).toEqual(401);

    //Register same username
    const res10 = await request.post("/account").send({userName : testuserName, password : testpassword, email : testemail, gender : testgender, birth : testbirth});
    expect(res10.statusCode).toEqual(500);
    */
});
