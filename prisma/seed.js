const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const PostType = {
    SALE: 'SALE',
    EVENT: 'EVENT',
    DONATION: 'DONATION',
}

async function main() {

    // clear database
    await prisma.notification.deleteMany();
    await prisma.message.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.like.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
    await prisma.city.deleteMany();

    // Create cities
    const city1 = await prisma.city.create({
        data: {
            name: 'New York',
            zipCode: '10001',
            latitude: '40.7128',
            longitude: '-74.0060',
        },
    });

    const city2 = await prisma.city.create({
        data: {
            name: 'Los Angeles',
            zipCode: '90001',
            latitude: '34.0522',
            longitude: '-118.2437',
        },
    });

    // Create categories
    const category1 = await prisma.category.create({
        data: { name: 'Electronics' },
    });

    const category2 = await prisma.category.create({
        data: { name: 'Furniture' },
    });

    // Create users
    const user1 = await prisma.user.create({
        data: {
            id: "cm0beis600001zd38r00ojc46",
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash("password", 10),
            role: 'USER',
            cityId: city1.id,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: "cm0beis600001zd38r00ojc47",
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: await bcrypt.hash("password", 10),
            role: 'ADMIN',
            cityId: city2.id,
        },
    });

    // Create posts
    const post1 = await prisma.post.create({
        data: {
            title: 'Looking to sell my laptop',
            text: 'Selling my 2020 MacBook Pro in great condition.',
            userId: user1.id,
            cityId: city1.id,
            categoryId: category1.id,
            price: 1000,
            isDonation: false,
            postType: PostType.SALE,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Community Cleanup Event',
            text: 'Join us for a community cleanup event this weekend.',
            userId: user1.id,
            cityId: city2.id,
            startAt: new Date('2024-07-20T09:00:00Z'),
            endAt: new Date('2024-07-20T12:00:00Z'),
            localisation: 'Central Park',
            postType: PostType.EVENT,
        },
    });

    // Create likes
    await prisma.like.create({
        data: {
            userId: user2.id,
            postId: post1.id,
        },
    });

    // Create comments
    await prisma.comment.create({
        data: {
            text: 'Is this still available?',
            userId: user2.id,
            postId: post1.id,
        },
    });

    // Create messages
    const message1 = await prisma.message.create({
        data: {
            content: 'Hello, I am interested in your laptop.',
            senderId: user2.id,
            receiverId: user1.id,
        },
    });

    // Create notifications
    await prisma.notification.create({
        data: {
            type: 'message',
            userId: user1.id,
            messageId: message1.id,
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
