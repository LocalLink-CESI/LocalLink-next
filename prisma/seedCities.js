const cities = require("./french_cities.json");
const { PrismaClient, $disconnect } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    // foreach element in french_cities.json
    // create a city in the database
    for (let i = 0; i < 100; i++) {
        const city = cities[i];
        await prisma.city.create({
            data: {
                name: city.city,
                zipCode: "",
                latitude: city.lat,
                longitude: city.lng,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
