const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    // Create Cities
    const city1 = await prisma.city.create({
        data: {
            name: 'New York',
            zipCode: '10001',
        },
    });

    const city2 = await prisma.city.create({
        data: {
            name: 'Los Angeles',
            zipCode: '90001',
        },
    });

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: bcrypt.hashSync('password', 10),
            role: 'USER',
            cityId: city1.id,
            bio: 'Lorem ipsum dolor sit amet.',
            avatar: 'https://example.com/avatar1.jpg',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: bcrypt.hashSync('password', 10),
            role: 'ADMIN',
            cityId: city2.id,
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
            cityId: city1.id,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Second Post',
            text: 'This is the second post.',
            isVisible: true,
            userId: user2.id,
            cityId: city2.id,
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
            cityId: city1.id,
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
            cityId: city2.id,
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
            cityId: city1.id,
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
            cityId: city2.id,
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
            cityId: city1.id,
        },
    });

    const culturePost2 = await prisma.culturePost.create({
        data: {
            title: 'Book Club',
            text: 'Join our book club for monthly discussions.',
            isVisible: true,
            userId: user2.id,
            cityId: city2.id,
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
