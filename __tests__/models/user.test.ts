import CreateUser from "@/app/actions/users/create";
import {GetUserWithId} from "@/app/actions/users/get";
import {DeleteUserWithId} from "@/app/actions/users/delete";
import {UpdateUserWithId} from "@/app/actions/users/update";
import bcrypt from "bcryptjs";

let uid = "clxspgy360001fgxtmkfbq5r2";
let randomMail = uid + "@test.mail";


//   ____ ____  _____    _  _____ _____
//  / ___|  _ \| ____|  / \|_   _| ____|
// | |   | |_) |  _|   / _ \ | | |  _|
// | |___|  _ <| |___ / ___ \| | | |___
//  \____|_| \_\_____/_/   \_\_| |_____|


test('Validating user creation', async () => {
    let form = new FormData();
    form.append('firstName', 'John');
    form.append('lastName', 'Doe');
    form.append('email', randomMail);
    form.append('password', '123456');
    form.append('avatar', 'avatar.jpg');
    form.append('bio', 'Hello World');
    form.append('cityId', '1');

    let response = await CreateUser(form) as { id : string }

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('avatar');
    expect(response).toHaveProperty('bio');
    expect(response).toHaveProperty('cityId');

    uid = response.id;
});

test('Validating user creation with invalid data', async () => {
    let form = new FormData();
    form.append('firstName', 'John');
    form.append('lastName', 'Doe');
    form.append('email', randomMail);
    form.append('password', '123456');
    form.append('avatar', 'avatar.jpg');
    form.append('bio', 'Hello World');
    form.append('cityId', '');

    let response = await CreateUser(form) as Error

    expect(response).toBeInstanceOf(Error);
});


//   ____ _____ _____
//  / ___| ____|_   _|
// | |  _|  _|   | |
// | |_| | |___  | |
//  \____|_____| |_|


test('Validating user retrieval with invalid id', async () => {
    let response = await GetUserWithId("invalid") as Error

    expect(response).toBeNull();
});


test('Validating user retrieval', async () => {
    let response = await GetUserWithId(uid) as { id : string }

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('avatar');
    expect(response).toHaveProperty('bio');
    expect(response).toHaveProperty('cityId');
});


//  ____   _    ____ ______        _____  ____  ____
// |  _ \ / \  / ___/ ___\ \      / / _ \|  _ \|  _ \
// | |_) / _ \ \___ \___ \\ \ /\ / / | | | |_) | | | |
// |  __/ ___ \ ___) |__) |\ V  V /| |_| |  _ <| |_| |
// |_| /_/   \_\____/____/  \_/\_/  \___/|_| \_\____/


test('Validation of password hashing', async () => {
    let password = '123456';
    let hashedPassword = await bcrypt.hash(password, 10)

    hashedPassword = await bcrypt.hash(password, 10)
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true)
});

test('Validation of password hashing with invalid password', async () => {
    let password = '123456';
    let hashedPassword = await bcrypt.hash(password, 10)

    expect(await bcrypt.compare('1234567', hashedPassword)).toBe(false)
});


//  _   _ ____  ____    _  _____ _____
// | | | |  _ \|  _ \  / \|_   _| ____|
// | | | | |_) | | | |/ _ \ | | |  _|
// | |_| |  __/| |_| / ___ \| | | |___
//  \___/|_|   |____/_/   \_\_| |_____|


test('Validation of update user', async () => {
    let form = new FormData();
    form.append('firstName', 'John');
    form.append('lastName', 'Doe');
    form.append('email', randomMail);
    form.append('password', '123456');
    form.append('avatar', 'avatar.jpg');
    form.append('bio', 'Hello World');
    form.append('cityId', "1");

    let response = await UpdateUserWithId(uid, form) as { id : string }

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('avatar');
    expect(response).toHaveProperty('bio');
    expect(response).toHaveProperty('cityId');
});

test('Validation of update user with invalid data', async () => {
    let form = new FormData();
    form.append('firstName', 'John');
    form.append('lastName', 'Doe');
    form.append('email', randomMail);
    form.append('password', '123456');
    form.append('avatar', 'avatar.jpg');
    form.append('bio', 'Hello World');
    form.append('cityId', '');

    let response = await UpdateUserWithId(uid, form) as Error

    expect(response).toBeInstanceOf(Error);
});


//  ____  _____ _     _____ _____ ___ ___  _   _
// |  _ \| ____| |   | ____|_   _|_ _/ _ \| \ | |
// | | | |  _| | |   |  _|   | |  | | | | |  \| |
// | |_| | |___| |___| |___  | |  | | |_| | |\  |
// |____/|_____|_____|_____| |_| |___\___/|_| \_|


test('Validating user deletion', async () => {
    let response = await DeleteUserWithId(uid) as { id : string }

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('avatar');
    expect(response).toHaveProperty('bio');
    expect(response).toHaveProperty('cityId');
});


test('Validating user deletion with invalid id', async () => {
    let response = await DeleteUserWithId("invalid") as Error

    expect(response).toBeInstanceOf(Error);
});