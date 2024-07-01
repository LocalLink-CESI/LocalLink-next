'use server';

import { prisma } from '@/helpers/database';
import {City} from "@/models/City";

export default async function GetCities() : Promise<City[]> {
    return prisma.city.findMany();
}