'use server';

import {prisma} from '@/helpers/database';

export default async function GetUser(email: string) {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    });
}