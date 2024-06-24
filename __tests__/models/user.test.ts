import CreateUser from "@/app/actions/users/create";
import {UpdateUserWithId} from "@/app/actions/users/update";
import {DeleteUserWithId} from "@/app/actions/users/delete";
import {GetUserWithId} from "@/app/actions/users/get";


const uid = Math.random().toString(36).slice(2);

test('Valid user creation', async () => {
    let form = new FormData;
    form.set("id", uid);
    form.set("firstName","test");
    form.set("lastName","test");
    form.set("email","john.doe@test.mail");
    form.set("password","securepassword");
    form.set("avatar","");
    form.set("bio","That's a bio");
    form.set("cityId","1");

    let response = await CreateUser(form);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("firstName");
    expect(response).toHaveProperty("lastName");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("role");
    expect(response).toHaveProperty("cityId");
});


// test('Valid user update', async () => {
//     let form = new FormData;
//     form.set("firstName","test");
//     form.set("lastName","test");
//     form.set("email","john.doe@notamail.com");
//     form.set("password","securepassword");
//     form.set("avatar","");
//     form.set("bio","That's a bio");
//     form.set("cityId","1");
//
//     let response = await UpdateUserWithId(uid, form);
//
//     expect(response).toHaveProperty("id");
//     expect(response).toHaveProperty("email");
//     expect(response).toHaveProperty("role");
//     expect(response).toHaveProperty("cityId");
// });

// test('Invalid user update', async () => {
//     let form = new FormData;
//     form.set("firstName","test");
//     form.set("lastName","test");
//     form.set("email","john.doe@notamail.com");
//     form.set("password","securepassword");
//     form.set("avatar","");
//     form.set("bio","That's a bio");
//     form.set("cityId","1");
//
//     let response = await UpdateUserWithId("clxspgy360001fgxtmkfbq5r2031239120391", form);
//
//     expect(response).toBeNull();
// });

// test('Invalid user creation', async () => {
//     let form = new FormData;
//     form.set("firstName","test");
//     form.set("lastName","test");
//     form.set("email","john.doe@notamail.com");
//     form.set("password","securepassword");
//     form.set("avatar","");
//     form.set("bio","That's a bio");
//     form.set("cityId","1");
//
//     let response = await CreateUser(form);
//
//     expect(response).toBeNull();
// });

test('Valid user deletion', async () => {
    await DeleteUserWithId(uid);

    const response = await GetUserWithId(uid);

    expect(response).toBeNull();
});
