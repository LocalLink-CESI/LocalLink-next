'use server';
import {PostType, prisma} from '@/helpers/database';

export default async function GetPostsWithPaginationAndType (pagination: {limit:number, offset:number}, type: PostType, cityId: number) : Promise<Array<any>> {
    const posts = await prisma[type as string].findMany({
        take: pagination.limit,
        skip: pagination.offset,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            cityId: cityId
        }
    });
    console.log(posts);
    return posts;
}

export async function GetPostWithId (id: number) {
    return prisma.post.findUnique({
        where: {
            id: id
        }
    }).catch();
}

