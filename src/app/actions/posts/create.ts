'use server';
import {prisma} from '@/helpers/database';
import {FormikValues} from "formik";
import {GetUserWithId} from "@/app/actions/users/get";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreatePost(form: FormikValues) {
    let user = await GetUserWithId(form.userId).catch((e: Error) => {
        return e;
    });

    if (user instanceof Error || user == null) return user;

    if (form.media) {
        const b64 = form.media.replace(/^data:image\/png;base64,/, "")
        let uuid = require("uuid").v4();
        try {
            require("fs").writeFile("./public/media/" + uuid + ".png", b64, 'base64', function (err) {
                console.error(err);
            });
        } catch (e) {
            console.error(e);
        }


        form.media = uuid + ".png";
    }

    // return prisma.post.create({
    //     data: {
    //         text: form.text,
    //         media: form.media,
    //         userId: form.userId,
    //         cityId: user.cityId,
    //         type: form.type,
    //         categoryId: form.categoryId,
    //         price: form.price,
    //         category: {
    //             connect: {
    //                 id: form.categoryId
    //             }
    //         },
    //     }
    // }).catch((e: PrismaClientValidationError) => {
    //     return e;
    // });
}