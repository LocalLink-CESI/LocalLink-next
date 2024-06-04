'use server';
import {PostType, prisma} from '@/helpers/database';
import {PrismaClient} from "@prisma/client";

export default async function GetPostsWithPaginationAndType (pagination: {limit:number, offset:number}, type: PostType, cityId: number) : Promise<Array<any>> {
    console.log(type);
    const posts = await prisma.post.findMany({
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

