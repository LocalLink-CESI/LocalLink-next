import bcrypt from 'bcrypt'
import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient().$extends({
    query: {
        user: {
            $allOperations({ operation, args, query }) {
                if (['create', 'update'].includes(operation) && args.data['password']) {
                    args.data['password'] = bcrypt.hashSync(args.data['password'], 10)

                }
                return query(args)
            }
        }
    }
})
export const enum PostType {
    DEFAULT = 'post',
    CULTURE = 'culturePost',
    EVENT = 'eventPost',
    SALE = 'salePost',
}