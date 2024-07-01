import { PrismaClient, PostType, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.city.deleteMany();
    await prisma.category.deleteMany();

    // Seed Categories
    const categories = await prisma.category.createMany({
        data: [
            { name: 'Technologie' },
            { name: 'Santé' },
            { name: 'Éducation' },
        ],
    });

    // Seed Cities
    const cities = await prisma.city.createMany({
        data: [
            { name: 'Paris', zipCode: '75001', latitude: '48.8566', longitude: '2.3522' },
            { name: 'Lyon', zipCode: '69001', latitude: '45.7640', longitude: '4.8357' },
        ],
    });

    // Fetch City IDs
    const paris = await prisma.city.findFirst({ where: { name: 'Paris' } });
    const lyon = await prisma.city.findFirst({ where: { name: 'Lyon' } });

    // Seed Users
    const passwordHash = await bcrypt.hash('password', 10);
    await prisma.user.createMany({
        data: [
            {
                email: 'jean.dupont@example.com',
                firstName: 'Jean',
                lastName: 'Dupont',
                bio: 'Ingénieur logiciel à Paris',
                password: passwordHash,
                role: Role.USER,
                cityId: paris?.id,
            },
            {
                email: 'marie.durand@example.com',
                firstName: 'Marie',
                lastName: 'Durand',
                bio: 'Passionnée de santé et blogueuse',
                password: passwordHash,
                role: Role.USER,
                cityId: lyon?.id,
            },
        ],
    });

    //Fetch User IDs
    const jean = await prisma.user.findFirst({ where: { email: 'jean.dupont@example.com' } });
    const marie = await prisma.user.findFirst({ where: { email: 'marie.durand@example.com' } });

    // Seed Categories
    await prisma.category.createMany({
        data: [
            { name: 'Technologie' },
            { name: 'Santé' },
            { name: 'Éducation' },
        ],
    });

    // Seed Posts
    await prisma.post.createMany({
        data: [
            {
                title: 'Conférence Tech 2023',
                text: 'Rejoignez-nous pour une journée de conférences et de réseautage.',
                userId: jean?.id,
                cityId: paris?.id,
                type: PostType.EVENT,
                startAt: new Date(),
                endAt: new Date(new Date().setDate(new Date().getDate() + 1)),
            },
            {
                title: 'Yoga pour Débutants',
                text: 'Séance de yoga relaxante pour tous les niveaux.',
                userId: marie?.id,
                cityId: lyon?.id,
                type: PostType.CULTURE,
                localisation: 'Studio de Yoga, Lyon',
            },
        ],
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