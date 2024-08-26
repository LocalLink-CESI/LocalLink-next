'use server';

import {prisma} from '@/helpers/database';



export async function GetAllPosts() {
    return prisma.post.findMany()
        .catch((e: Error) => {
            return (e);
        });
}

export async function GetCityPosts(cityId: number, limit: number, offset: number) {
    if (!cityId) {
        return new Error("City ID is required");
    }
    if (!limit || limit > 30) {
        limit = 30;
    }
    if (!offset || offset < 0) {
        offset = 0;
    }
    return prisma.post.findMany({
        where: {
            cityId: cityId
        },
        take: limit,
        skip: offset
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetPostById(id: number) {
    return prisma.post.findUnique({
        where: {
            id: id
        }
    }).catch((e: Error) => {
        return (e);
    });
}