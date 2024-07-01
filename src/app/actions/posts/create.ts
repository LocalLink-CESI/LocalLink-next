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

        try {
            require("fs").mkdirSync("./public/media");
        } catch (e) {
            console.error(e);
        }

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

    const type = form.type;

    const commonData = {
        title: form.title,
        text: form.text,
        userId: user.id,
        cityId: user.city.id,
        media: form.media,
    };

    let specificData = {
        categoryId: form.categoryId,
        price: form.isDonation ? 0 : form.price,
        isDonation: form.isDonation,

        startAt: new Date(form.startAt),
        endAt: new Date(form.endAt),
        localisation: form.localisation,
    };

    return prisma.post.create({
        data: {...commonData, ...specificData, type},
    }).catch((e: PrismaClientValidationError) => {
        console.error(e);
        return e;
    });
}