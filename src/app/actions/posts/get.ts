'use server';

import {PostType, prisma} from '@/helpers/database';

export default async function GetPostsWithPaginationAndType (pagination: {limit:number, offset:number}, type: PostType, cityId: number) : Promise<Array<any>> {
    // @ts-ignore
    return prisma[type as string].findMany({
        take: pagination.limit,
        skip: pagination.offset,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            cityId: cityId
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    image: true,
                    city: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    }).catch((e: Error) => {
        return (e);
    });
}

export async function GetPostWithId (id: number) {
    return prisma.post.findUnique({
        where: {
            id: id
        }
    }).catch((e: Error) => {
        return (e);
    });
}



export async function GetPostsWithUserIdWithPagination (pagination: {limit:number, offset:number}, id: string) {
    return prisma.post.findMany({
        take: pagination.limit,
        skip: pagination.offset,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            userId: id
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    image: true,
                    city: {
                        select: {
                            name: true
                        }
                    }
                }
            },
        }
    }).catch((e: Error) => {
        return (e);
    });

}

export async function GetPostsWithUserId (id: string) {
    return prisma.post.findMany({
        where: {
            userId: id
        }
    }).catch((e: Error) => {
        return (e);
    });
}
