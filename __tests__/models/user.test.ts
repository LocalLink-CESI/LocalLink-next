import {User} from '@prisma/client';

import {prisma} from "@/helpers/database";

describe('User model', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    test('should create a new user', async () => {
        const user: User = await prisma.user.create({
            data: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'securepassword',
                role: 'USER',
                city: {
                    create: {
                        name: 'Sample City',
                        zipCode: '12345',
                        latitude: '10.0000',
                        longitude: '20.0000',
                    },
                },
            },
        });

        expect(user).toHaveProperty('id');
        expect(user.firstName).toBe('John');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.role).toBe('USER');
    });

    test('should fetch a user by email', async () => {
        const user = await prisma.user.findUnique({
            where: {email: 'john.doe@example.com'},
        });

        expect(user).not.toBeNull();
        expect(user!.email).toBe('john.doe@example.com');
    });

    test('should update a user', async () => {
        const user = await prisma.user.update({
            where: {email: 'john.doe@example.com'},
            data: {
                firstName: 'Jane',
            },
        });

        expect(user).toHaveProperty('id');
        expect(user.firstName).toBe('Jane');
    });

    test('should delete a user', async () => {
        const user = await prisma.user.delete({
            where: {email: 'john.doe@example.com'},
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('john.doe@example.com');



        const deletedUser = await prisma.user.findUnique({
            where: {email: 'john.doe@example.com'},
        });

        expect(deletedUser).toBeNull();
    });
});
