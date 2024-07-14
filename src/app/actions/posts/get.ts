'use server';

import {prisma} from '@/helpers/database';


export async function GetAllPosts() {
    return prisma.post.findMany()
        .catch((e: Error) => {
            return (e);
        });
}

export async function GetCityPosts(cityId: number) {
    return prisma.post.findMany({
        where: {
            cityId: cityId
        }
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