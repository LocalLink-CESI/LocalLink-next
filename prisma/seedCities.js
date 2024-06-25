const cities = require("./french_cities.json");
const {city, $disconnect} = require("@prisma/client");

async function main() {

    // foreach element in french_cities.json
    // create a city in the database
    for (let i = 0; i < 100; i++) {
        const city = cities[i];
        await city.create({
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
        await $disconnect();
    });
