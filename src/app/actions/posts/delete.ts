'use server';
import {PostType, prisma} from '@/helpers/database';

export default async function DeletePost(id: number, type: PostType) {
    return prisma[type as string].delete({
        where: {
            id: id
        }
    }).catch((error) => {
        console.log(error);
    });
}