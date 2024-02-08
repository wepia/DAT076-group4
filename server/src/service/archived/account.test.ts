import { AccountService } from "./account";

test("If an account is created, then it should be added to the list of all accounts", async() => {
    const userName = "testnamn";
    const email = "testemail";
    const password = "testlosen";
    const confirmPassword = "testlosen";
    const gender = "testgender";
    const birth = "0701200";

    const accountService : AccountService = new AccountService();

    await accountService.registerAccounts(userName,password,confirmPassword, email, gender,birth);

    const accounts = await accountService.getAccounts();


    expect(accounts.some((account) => account.userName === userName && account.email === email && account.password === password && account.gender === gender && account.birth === birth)).toBeTruthy();

})