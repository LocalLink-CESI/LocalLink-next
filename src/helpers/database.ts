import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export const Prisma = new PrismaClient().$extends({
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