'use server';
import {PostType, prisma} from '@/helpers/database';
import {FormikValues} from "formik";
import {GetUserWithId} from "@/app/actions/users/get";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreatePost(form: FormikValues, type: PostType) {
    // @ts-ignore
    let user = await GetUserWithId(form.userId).catch((e: Error) => {return e;});

    if (user instanceof Error || user == null) return user;

    switch(type) {
        case PostType.DEFAULT :
            return CreateDefaultPost(form, type, user);
        case PostType.CULTURE:
            return CreateCulturePost(form, type, user);
        case PostType.SALE:
            return CreateSalePost(form, type, user);
        case PostType.EVENT:
            return CreateEventPost(form, type, user);
    }
}

async function CreateDefaultPost(form: FormikValues, type: PostType, user) {
    return prisma.post.create({
        data: {
            title: form.title,
            text: form.text,
            userId: user.id,
            cityId: user.city.id
        }
    }).catch((e: PrismaClientValidationError) => {
        return (e);
    });
}

async function CreateCulturePost(form: FormikValues, type: PostType, user) {
    return prisma.culturePost.create({
        data: {
            title: form.title,
            text: form.text,
            userId: user.id,
            cityId: user.city.id
        }
    }).catch((e: PrismaClientValidationError) => {
        return (e);
    });
}

async function CreateSalePost(form: FormikValues, type: PostType, user) {
    return prisma.salePost.create({
        data: {
            title: form.title,
            text: form.text,
            userId: user.id,
            cityId: user.city.id,

            categoryId: form.categoryId,
            price: form.price,
            isDonation: form.isDonation,
        }
    }).catch((e: PrismaClientValidationError) => {
        return (e);
    });
}

async function CreateEventPost(form: FormikValues, type: PostType, user) {
    console.log(form.startAt, form.endAt)
    return prisma.eventPost.create({
        data: {
            title: form.title,
            text: form.text,
            userId: user.id,
            cityId: user.city.id,

            startAt: new Date(form.startAt),
            endAt: new Date(form.endAt),
            localisation: form.location
        }
    }).catch((e: PrismaClientValidationError) => {
        return (e);
    });
}