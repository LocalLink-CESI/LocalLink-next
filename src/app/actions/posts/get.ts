'use server';

import {PostType, prisma} from '@/helpers/database';

export default async function GetPostsWithPaginationAndType(pagination: { limit: number, offset: number }, type: PostType, cityId: number): Promise<Array<any>> {
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
            likes: {
                select: {
                    userId: true
                }
            },
            comments: {
                select: {
                    userId: true,
                }
            },
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
        console.error(e)
        return (e);
    });
}

export async function GetPostsWithPaginationFeed(pagination: { limit: number, offset: number }, cityId: number) {
    let posts = [];
    let defaultPosts = await GetPostsWithPaginationAndType(pagination, PostType.DEFAULT, cityId);
    let culturePosts = await GetPostsWithPaginationAndType(pagination, PostType.CULTURE, cityId);
    let salePosts = await GetPostsWithPaginationAndType(pagination, PostType.SALE, cityId);
    let eventPosts = await GetPostsWithPaginationAndType(pagination, PostType.EVENT, cityId);

    posts.push(defaultPosts);
    posts.push(culturePosts);
    posts.push(salePosts);
    posts.push(eventPosts);

    let types = [PostType.DEFAULT, PostType.CULTURE, PostType.SALE, PostType.EVENT];
    let finalPosts = [];
    //add the key type to all nested post
    posts.forEach((postType, value) => {
        postType.forEach((post) => {
            post.type = types[value];
            finalPosts.push(post);
        });
    });

    return finalPosts;
}

export async function GetPostWithIdAndType(id: number, type: PostType) {
    let query = {
        where: {
            id: id
        },
        include: {
            likes: {
                select: {
                    userId: true
                }
            },
            comments: {
                select: {
                    userId: true
                }
            }
        }
    };

    switch (type) {
        case PostType.DEFAULT :
            return GetPostWithId(query);
        case PostType.CULTURE:
            return GetCulturePostWithId(query);
        case PostType.SALE:
            return GetSalePostWithId(query);
        case PostType.EVENT:
            return GetEventPostWithId(query);
    }
}

async function GetPostWithId(query) {
    return prisma.post.findUnique(query).catch((e: Error) => {
        return (e);
    });
}

async function GetCulturePostWithId(query) {
    return prisma.culturePost.findUnique(query).catch((e: Error) => {
        return (e);
    });
}

async function GetSalePostWithId(query) {
    return prisma.salePost.findUnique(query).catch((e: Error) => {
        return (e);
    });
}

async function GetEventPostWithId(query) {
    return prisma.eventPost.findUnique(query).catch((e: Error) => {
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
