'use server';
import {PostType, prisma} from '@/helpers/database';

export default async function CreatePost(form: FormData, type: PostType) {
    // @ts-ignore
    return prisma[type as string].create({
        data: {
            title: form.get('title') as string,
            text: form.get('text') as string,
            media: form.get('media') as string,
            isVisible: (form.get('isVisible') === "true"),
            userId: form.get('userId') as string,
            cityId: form.get('cityId') as unknown as number,
        }
    }).catch((e: Error) => {
        return (e);
    });
}