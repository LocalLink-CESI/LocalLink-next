'use server';

import { prisma } from '@/helpers/database';

export default async function GetCities() {
    return prisma.city.findMany();
}