const cities = require("./french_cities.json");
const {city, PrismaClient} = require("@prisma/client");

async function main() {
    const prisma = new PrismaClient();

    // foreach element in french_cities.json
    // create a city in the database
    await prisma.city.deleteMany({})

    for (let i = 0; i < 100; i++) {
        const ville = cities[i];
        await prisma.city.create({
            data: {
                name: ville.city,
                zipCode: "",
                latitude: ville.lat,
                longitude: ville.lng,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
