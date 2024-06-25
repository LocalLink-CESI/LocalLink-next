'use server';

import { prisma } from '@/helpers/database';

export default async function GetCategories() {
    return prisma.category.findMany().catch((e) => {
        return e;
    });
}