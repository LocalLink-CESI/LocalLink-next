import CreateUser from "@/app/actions/users/create";
import {GetUserWithId} from "@/app/actions/users/get";
import DeleteMe, {DeleteUserWithId} from "@/app/actions/users/delete";


const uid = "clxspgy360001fgxtmkfbq5r15";
const uid2 = "clxspgy360001fgxtmkfbq5r10";

const randomMail = Math.random().toString(36).slice(2) + "@test.mail";
const randomMail2 = Math.random().toString(36).slice(2) + "@test.mail";

test('Valid user creation', async () => {
    let form = new FormData;
    form.set("id", uid);
    form.set("firstName","test");
    form.set("lastName","test");
    form.set("email", randomMail);
    form.set("password","securepassword");
    form.set("avatar","");
    form.set("bio","That's a bio");
    form.set("cityId","1");

    let response = await CreateUser(form);

    expect(response).toHaveProperty("firstName");
    expect(response).toHaveProperty("lastName");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("role");
    expect(response).toHaveProperty("cityId");
});

test('Invalid user creation without city', async () => {
    let form = new FormData;
    form.set("id", uid2);
    form.set("firstName","test");
    form.set("lastName","test");
    form.set("email", randomMail2);
    form.set("password","securepassword");
    form.set("avatar","");
    form.set("bio","That's a bio");
    form.set("cityId","");

    let response = await CreateUser(form);

    expect(response).toBeInstanceOf(Error);
});

test('Valid user retrieval', async () => {
    const response = await GetUserWithId(uid);

    expect(response).toHaveProperty("firstName");
    expect(response).toHaveProperty("lastName");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("role");
    expect(response).toHaveProperty("cityId");
});

test('Invalid user retrieval', async () => {
    const response = await GetUserWithId(uid2);

    expect(response).toBeNull();
});

test('Valid user deletion', async () => {
    await DeleteUserWithId(uid);

    const response = await GetUserWithId(uid);

    expect(response).toBeNull();
});

test('Invalid user deletion', async () => {
    const response = await DeleteUserWithId(uid2);

    expect(response).toBeInstanceOf(Error);
});