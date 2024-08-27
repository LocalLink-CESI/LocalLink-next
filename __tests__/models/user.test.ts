import {CreateUserFromModel} from "@/app/actions/users/create";
import {GetAllUsers, GetUserWithId} from "@/app/actions/users/get";
import {DeleteUserWithId} from "@/app/actions/users/delete";
import {UpdateUserWithId} from "@/app/actions/users/update";
import bcrypt from "bcryptjs";
import {getServerSession} from "next-auth";
import User, { Role } from "@/models/User";

let uid = "clxspgy360001fgxtmkfbq5r2";
let randomMail = uid + "@test.mail";


jest.mock("next-auth");


//   ____ ____  _____    _  _____ _____
//  / ___|  _ \| ____|  / \|_   _| ____|
// | |   | |_) |  _|   / _ \ | | |  _|
// | |___|  _ <| |___ / ___ \| | | |___
//  \____|_| \_\_____/_/   \_\_| |_____|


test('Validating user creation', async () => {
    const form : User = {
        firstName: 'John',
        lastName: 'Doe',
        email: randomMail,
        image: 'image.jpg',
        bio: 'Hello World',
        cityId: 1,
        role: Role.USER
    };

    let response = await CreateUserFromModel(form, '123456');

    if (response instanceof Error) {
        console.error(response);
        expect(response).not.toBeInstanceOf(Error);
        return;
    }

    uid = response.id;

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email', randomMail);
    expect(response).toHaveProperty('firstName', 'John');
    expect(response).toHaveProperty('lastName', 'Doe');
    expect(response).toHaveProperty('image', 'image.jpg');
    expect(response).toHaveProperty('bio', 'Hello World');
    expect(response).toHaveProperty('cityId', 1);
});

test('Validating user creation with invalid data', async () => {
    const form : User = {
        firstName: 'John',
        lastName: 'Doe',
        email: randomMail,
        image: 'image.jpg',
        bio: 'Hello World',
        cityId: null, // Invalid cityId
        role: Role.USER
    };

    let response = await CreateUserFromModel(form, '123456');

    expect(response).toBeInstanceOf(Error);
});


//   ____ _____ _____
//  / ___| ____|_   _|
// | |  _|  _|   | |
// | |_| | |___  | |
//  \____|_____| |_|


test('Validating user retrieval', async () => {
    let response = await GetUserWithId(uid);

    expect(response).toHaveProperty('id', uid);
    expect(response).toHaveProperty('email', randomMail);
    expect(response).toHaveProperty('firstName', 'John');
    expect(response).toHaveProperty('lastName', 'Doe');
    expect(response).toHaveProperty('image', 'image.jpg');
    expect(response).toHaveProperty('bio', 'Hello World');
    expect(response).toHaveProperty('cityId', 1);
});

test('Validating user retrieval with invalid id', async () => {
    let response = await GetUserWithId("invalid");

    expect(response).toBeNull();
});

test('Validating all users retrieval', async () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "jane.smith@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "ADMIN",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));

    let response = await GetAllUsers();

    expect(response).not.toBeNull();
    expect(response).not.toBeInstanceOf(Error);
});

test('Validating all users retrieval with invalid session', async () => {
    const mockSession = {
        expires: new Date(Date.now() - 2 * 86400).toISOString(),
        user: {
            email: "john.doe@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "USER",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await GetAllUsers();

    expect(response).toBeInstanceOf(Error);
});


//  ____   _    ____ ______        _____  ____  ____
// |  _ \ / \  / ___/ ___\ \      / / _ \|  _ \|  _ \
// | |_) / _ \ \___ \___ \\ \ /\ / / | | | |_) | | | |
// |  __/ ___ \ ___) |__) |\ V  V /| |_| |  _ <| |_| |
// |_| /_/   \_\____/____/  \_/\_/  \___/|_| \_\____/


test('Validation of password hashing', async () => {
    let password = '123456';
    let hashedPassword = await bcrypt.hash(password, 10);

    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
});

test('Validation of password hashing with invalid password', async () => {
    let password = '123456';
    let hashedPassword = await bcrypt.hash(password, 10);

    expect(await bcrypt.compare('1234567', hashedPassword)).toBe(false);
});



//  _   _ ____  ____    _  _____ _____
// | | | |  _ \|  _ \  / \|_   _| ____|
// | | | | |_) | | | |/ _ \ | | |  _|
// | |_| |  __/| |_| / ___ \| | | |___
//  \___/|_|   |____/_/   \_\_| |_____|


test('Validation of update user', async () => {
    let form = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: randomMail,
        password: '123456',
        image: 'image.jpg',
        bio: 'Hello World',
        cityId: 1
    };

    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "jane.smith@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "ADMIN",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));

    let response = await UpdateUserWithId(uid, form);

    expect(response).toHaveProperty('id', uid);
    expect(response).toHaveProperty('email', randomMail);
    expect(response).toHaveProperty('firstName', 'Jane');
    expect(response).toHaveProperty('lastName', 'Doe');
    expect(response).toHaveProperty('image', 'image.jpg');
    expect(response).toHaveProperty('bio', 'Hello World');
    expect(response).toHaveProperty('cityId', 1);
});

test('Validation of update user with invalid data', async () => {
    let form = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: randomMail,
        password: '123456',
        image: 'image.jpg',
        bio: 'Hello World',
        cityId: null // Invalid cityId
    };

    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "jane.smith@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "ADMIN",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await UpdateUserWithId(uid, form);

    expect(response).toBeInstanceOf(Error);
});

test('Validation of update user with no perm', async () => {
    let form = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: randomMail,
        password: '123456',
        image: 'image.jpg',
        bio: 'Hello World',
        cityId: 1 // Invalid cityId
    };

    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "john.doe@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "USER",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await UpdateUserWithId(uid, form);

    expect(response).toBeInstanceOf(Error);
});

//  ____  _____ _     _____ _____ ___ ___  _   _
// |  _ \| ____| |   | ____|_   _|_ _/ _ \| \ | |
// | | | |  _| | |   |  _|   | |  | | | | |  \| |
// | |_| | |___| |___| |___  | |  | | |_| | |\  |
// |____/|_____|_____|_____| |_| |___\___/|_| \_|


test('Validating user deletion', async () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "jane.smith@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "ADMIN",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));

    let response = await DeleteUserWithId(uid);

    expect(response).toHaveProperty('id', uid);
    expect(response).toHaveProperty('email', randomMail);
    expect(response).toHaveProperty('firstName', 'Jane');
    expect(response).toHaveProperty('lastName', 'Doe');
    expect(response).toHaveProperty('image', 'image.jpg');
    expect(response).toHaveProperty('bio', 'Hello World');
    expect(response).toHaveProperty('cityId', 1);
});

test('Validating user deletion with invalid id', async () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "jane.smith@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "ADMIN",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await DeleteUserWithId("invalid");

    expect(response).toBeInstanceOf(Error);
});

test('Validating user deletion with no authorization', async () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
            email: "john.doe@example.com",
            id: "clxspgy5i0003fgxtt3fq3yzg",
            cityId: 1,
            role: "USER",
        }
    };
    (getServerSession as jest.Mock).mockImplementation(() => Promise.resolve(mockSession));
    let response = await DeleteUserWithId("invalid");

    expect(response).toBeInstanceOf(Error);
});
