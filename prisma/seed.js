const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const cities = require('./french_cities.json');

async function main() {

    // foreach element in french_cities.json
    // create a city in the database
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        await prisma.city.create({
            data: {
                name: city.city,
                zipCode: "",
                latitude: city.lat,
                longitude: city.lng,
            },
        });
    }

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            id: "clxspgy360001fgxtmkfbq5r9",
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: bcrypt.hashSync('password', 10),
            role: 'USER',
            cityId: 1,
            bio: 'Lorem ipsum dolor sit amet.',
            avatar: 'https://example.com/avatar1.jpg',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: "clxspgy5i0003fgxtt3fq3yzg ",
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: bcrypt.hashSync('password', 10),
            role: 'ADMIN',
            cityId: 2,
            bio: 'Lorem ipsum dolor sit amet.',
            avatar: 'https://example.com/avatar2.jpg',
        },
    });

    // Create Posts
    const post1 = await prisma.post.create({
        data: {
            title: 'First Post',
            text: 'This is the first post.',
            isVisible: true,
            userId: user1.id,
            cityId: 3,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Second Post',
            text: 'This is the second post.',
            isVisible: true,
            userId: user2.id,
            cityId: 4,
        },
    });

    // Create Categories
    const category1 = await prisma.category.create({
        data: {
            name: 'Electronics',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Furniture',
        },
    });

    // Create SalePosts
    const salePost1 = await prisma.salePost.create({
        data: {
            title: 'iPhone for sale',
            text: 'Selling my old iPhone.',
            isVisible: true,
            userId: user1.id,
            cityId: 1,
            categoryId: category1.id,
            price: 500,
            isDonation: false,
        },
    });

    const salePost2 = await prisma.salePost.create({
        data: {
            title: 'Sofa for sale',
            text: 'Selling my old sofa.',
            isVisible: true,
            userId: user2.id,
            cityId: 2,
            categoryId: category2.id,
            price: 200,
            isDonation: false,
        },
    });

    // Create EventPosts
    const eventPost1 = await prisma.eventPost.create({
        data: {
            title: 'Music Concert',
            text: 'Join us for a night of great music!',
            isVisible: true,
            userId: user1.id,
            cityId: 3,
            startAt: new Date('2023-08-01T19:00:00.000Z'),
            endAt: new Date('2023-08-01T21:00:00.000Z'),
            localisation: 'Central Park',
        },
    });

    const eventPost2 = await prisma.eventPost.create({
        data: {
            title: 'Art Exhibition',
            text: 'Explore the latest in contemporary art.',
            isVisible: true,
            userId: user2.id,
            cityId: 4,
            startAt: new Date('2023-09-01T10:00:00.000Z'),
            endAt: new Date('2023-09-01T18:00:00.000Z'),
            localisation: 'Downtown Gallery',
        },
    });

    // Create CulturePosts
    const culturePost1 = await prisma.culturePost.create({
        data: {
            title: 'Theater Review',
            text: 'A review of the latest theater production.',
            isVisible: true,
            userId: user1.id,
            cityId: 5,
        },
    });

    const culturePost2 = await prisma.culturePost.create({
        data: {
            title: 'Book Club',
            text: 'Join our book club for monthly discussions.',
            isVisible: true,
            userId: user2.id,
            cityId: 6,
        },
    });

    // Create Sessions
    await prisma.session.create({
        data: {
            userId: user1.id,
            expires: new Date('2024-01-01T00:00:00.000Z'),
            sessionToken: 'sessionToken1',
            accessToken: 'accessToken1',
        },
    });

    await prisma.session.create({
        data: {
            userId: user2.id,
            expires: new Date('2024-01-01T00:00:00.000Z'),
            sessionToken: 'sessionToken2',
            accessToken: 'accessToken2',
        },
    });

    // Create Accounts
    await prisma.account.create({
        data: {
            userId: user1.id,
            providerType: 'oauth',
            providerId: 'provider1',
            providerAccountId: 'providerAccount1',
        },
    });

    await prisma.account.create({
        data: {
            userId: user2.id,
            providerType: 'oauth',
            providerId: 'provider2',
            providerAccountId: 'providerAccount2',
        },
    });

    // Create VerificationRequests
    await prisma.verificationRequest.create({
        data: {
            identifier: 'john.doe@example.com',
            token: 'token1',
            expires: new Date('2024-01-01T00:00:00.000Z'),
        },
    });

    await prisma.verificationRequest.create({
        data: {
            identifier: 'jane.doe@example.com',
            token: 'token2',
            expires: new Date('2024-01-01T00:00:00.000Z'),
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
