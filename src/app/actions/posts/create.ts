'use server';
import { prisma } from '@/helpers/database';

export default async function CreatePost(form: FormData) {
        await prisma.post.create({
            data: {
                title: form.get('title') as string,
                text: form.get('text') as string,
                media: form.get('media') as string,
                isVisible: (form.get('isVisible') === "true"),
                userId: form.get('userId') as unknown as string,
                cityId: form.get('cityId') as unknown as number,
            }
        }).then((post) => {
            console.log(post);
        }).catch((error) => {
            console.log(error);
        });
}