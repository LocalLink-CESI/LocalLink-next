import {PrismaClient} from "@prisma/client";

// export const prisma = new PrismaClient().$extends({
//     query: {
//         user: {
//             $allOperations({ operation, args, query }) {
//                 if (['signup', 'update'].includes(operation) && args.data['password']) {
//                     args.data['password'] = bcrypt.hashSync(args.data['password'], 10)
//
//                 }
//                 return query(args)
//             }
//         }
//     }
// })

export const prisma = new PrismaClient()

export const enum PostType {
    DEFAULT = 'post',
    CULTURE = 'culturePost',
    EVENT = 'eventPost',
    SALE = 'salePost',
}

export type PrismaPostType = 'post' | 'culturePost' | 'eventPost' | 'salePost';
