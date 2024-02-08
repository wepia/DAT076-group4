import * as SuperTest from "supertest";
import {app} from "./start";
import {Account} from "./model/archived/account";

const request = SuperTest.default(app);

test("End-to-end test", async() => {
    
    const userName = "testnamn";
    const email = "testemail";
    const password = "testlosen";
    const confirmPassword = "testlosen";
    const gender = "testgender";
    const birth = "0701200";
    
    
    const res1 = (await request.post("/account").send({userName : userName, password : password, confirmPassword : confirmPassword, email : email, gender : gender, birth : birth}))
    expect(res1.statusCode).toEqual(200)
    expect(res1.body.userName).toEqual(userName);
    expect(res1.body.password).toEqual(password);
    expect(res1.body.email).toEqual(email);
    expect(res1.body.gender).toEqual(gender);
    expect(res1.body.birth).toEqual(birth);
    
    const res2 = await request.get("/account");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((account : Account) => account.userName)).toContain(userName);
    expect(res2.body.map((account : Account) => account.password)).toContain(password);
    expect(res2.body.map((account : Account) => account.email)).toContain(email);
    expect(res2.body.map((account : Account) => account.gender)).toContain(gender);
    expect(res2.body.map((account : Account) => account.birth)).toContain(birth);


})