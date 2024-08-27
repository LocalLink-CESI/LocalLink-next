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
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    image: true,
                    city: true,
                }
            },
            likes: true,
            comments: true,
        },
        take: limit,
        skip: offset
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetPostById(id: number, includeComments: boolean = false) {
    return prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    image: true,
                    city: true,
                }
            },
            likes: true,
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            image: true,
                            city: true,
                        }
                    }
                }
            },
        }
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetPostByUserId(userId: string) {
    return prisma.post.findMany({
        where: {
            userId: userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    image: true,
                    city: true,
                }
            },
            likes: true,
            comments: true,
        }
    }).catch((e: Error) => {
        return (e);
    });
}