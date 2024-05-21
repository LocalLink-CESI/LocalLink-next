start:
	docker compose up -d
	make migrate
start-prod:
	docker compose -f docker-compose-prod.yml up -d
stop:
	docker compose down
restart:
	docker compose down
	docker compose up -d
	make migrate
restart-prod:
	docker compose -f docker-compose-prod.yml down
	docker compose -f docker-compose-prod.yml up -d
migrate:
	# Wait for the database to become healthy
	docker-compose exec locallink-db pg_isready -U postgres -q -h locallink-db

	# Run Prisma commands
	docker-compose exec locallink-next npx prisma generate
	docker-compose exec locallink-next npx prisma db push