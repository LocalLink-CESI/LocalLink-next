'use server';
import { prisma } from '@/helpers/database';
import { FormikValues } from "formik";
import { GetUserWithId } from "@/app/actions/users/get";

import { Prisma } from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import { PostType } from ".prisma/client";

export default async function CreatePost(form: FormikValues) {
    let user = await GetUserWithId(form.userId).catch((e: Error) => {
        return e;
    });

    if (user instanceof Error) {
        return user;
    }

    if (form.media) {
        const b64 = form.media.replace(/^data:image\/png;base64,/, "")
        let uuid = require("uuid").v4();
        try {
            require("fs").writeFile("./public/media/" + uuid + ".png", b64, 'base64', function (err) {
                console.error(err);
            });
        } catch (e) {
            return e;
        }


        form.media = uuid + ".png";
    }

    return prisma.post.create({
        data: {
            title: form.title,
            text: form.text,
            userId: form.userId,
            cityId: user?.cityId,
            media: form.media,
            postType: form.type as PostType,
        }
    }).catch((e: PrismaClientValidationError) => {
        console.error(e);
    });
}