'use server';

import { prisma } from "@/helpers/database";
import {User} from "@/models/User";

export async function GetAllUsers() : Promise<User[] | Error>{
    return prisma.user.findMany().catch((error: Error) => {
        return error;
    });
}

export async function GetUserWithId(id: string) : Promise<User | Error>{
    return prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            city: true
        }
    }).catch((error: Error) => {
        return error;
    });
}