start:
	docker compose up -d
	make migrate
seed:
	docker compose up -d
	docker compose exec locallink-next node prisma/seed.js
test:
	make seed
	docker compose up -d
	docker compose exec locallink-next npm run test
seed-cities:
	docker compose up -d
	docker compose exec locallink-next node prisma/seedCities.js
start-prod:
	docker compose -f docker-compose-prod.yml up -d
stop-prod:
	docker compose -f docker-compose-prod.yml down
stop:
	docker compose down
restart:
	docker compose down
	docker compose up -d
	make migrate
restart-prod:
	make stop-prod
	make start-prod
migrate:
	# Wait for the database to become healthy
	docker compose exec locallink-db pg_isready -U postgres -q -h locallink-db

	# Run Prisma commands
	docker compose exec locallink-next npx prisma generate
	docker compose exec locallink-next npx prisma db push
deploy:
	git pull origin main
	make restart-prod
test:
	docker compose -f docker-compose.test.yml up -d
	# Wait for the database to become healthy
	docker compose -f docker-compose.test.yml exec locallink-db pg_isready -U postgres -q -h locallink-db

	# Run Prisma commands
	docker compose -f docker-compose.test.yml exec locallink-next npx prisma generate
	docker compose -f docker-compose.test.yml exec locallink-next npx prisma db push

	make seed
	docker compose -f docker-compose.test.yml exec locallink-next npm run test