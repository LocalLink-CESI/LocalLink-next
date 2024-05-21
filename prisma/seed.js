const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create cities
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

    // Create users
    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            mail: 'john.doe@example.com',
            password: 'securepassword',
            bio: 'Just a regular John Doe.',
            avatar: 'https://example.com/avatar1.png',
            cityId: city1.id,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            mail: 'jane.smith@example.com',
            password: 'securepassword',
            bio: 'Just a regular Jane Smith.',
            avatar: 'https://example.com/avatar2.png',
            cityId: city2.id,
        },
    });

    // Create categories
    const category1 = await prisma.category.create({
        data: {
            name: 'Electronics',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Books',
        },
    });

    // Create posts
    const post1 = await prisma.post.create({
        data: {
            title: 'Post 1',
            text: 'This is the first post.',
            media: { images: ['https://example.com/image1.png'] },
            isVisible: true,
            userId: user1.id,
            cityId: city1.id,
            type: 'GOODS_SERVICES',
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Post 2',
            text: 'This is the second post.',
            media: { images: ['https://example.com/image2.png'] },
            isVisible: false,
            userId: user2.id,
            cityId: city2.id,
            type: 'CULTURE',
        },
    });

    // Create event posts
    const eventPost1 = await prisma.eventPost.create({
        data: {
            postId: post1.id,
            startAt: new Date('2024-06-01T10:00:00Z'),
            endAt: new Date('2024-06-01T12:00:00Z'),
            localisation: 'Central Park, New York',
        },
    });

    // Create goods services posts
    const goodsServicesPost1 = await prisma.goodsServicesPost.create({
        data: {
            postId: post1.id,
            categoryId: category1.id,
            price: 100,
            isDonation: false,
        },
    });

    // Create culture posts
    const culturePost1 = await prisma.culturePost.create({
        data: {
            postId: post2.id,
        },
    });

    // Create likes
    await prisma.like.create({
        data: {
            userId: user1.id,
            postId: post2.id,
        },
    });

    // Create comments
    await prisma.comment.create({
        data: {
            text: 'Nice post!',
            userId: user2.id,
            postId: post1.id,
        },
    });

    // Create messages
    const message1 = await prisma.message.create({
        data: {
            content: 'Hello, how are you?',
            senderId: user1.id,
            receiverId: user2.id,
        },
    });

    // Create notifications
    await prisma.notification.create({
        data: {
            type: 'message',
            userId: user2.id,
            messageId: message1.id,
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
