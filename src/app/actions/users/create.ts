'use server';
import { Prisma } from '@/helpers/database';

export default async function CreateUser(form: FormData) {
    await Prisma.user.create({
        data: {
            firstName: form.get('firstName') as string,
            lastName: form.get('lastName') as string,
            mail: form.get('email') as string,
            password: form.get('password') as string,
            cityId: form.get('cityId') as unknown as number,
            bio: form.get('bio') as string,
            avatar: form.get('avatar') as string,
        }
    }).then((user) => {
        console.log(user);
    }).catch((error) => {
        console.log(error);
    });
}