# BTD-core
The core repo for hosting Bill Tracker Deluxe microservices (name subject to change)

## Setup Instructions

### 1. Configure Environment Variables

Create a `.emv` file in the project root using `env.example` for reference

```env
HOST=localhost
NODE_ENV=dev

# For use in auth
SESSION_SECRET=secret

PG_USER=user
PG_PASSWORD=pass
# PG_DATABASE will be set in each individual microservice that uses a db
```

This forms as an entry point for any local db setup.

### 2. Run docker-compose

Run the following command to set up your microservices in containers, while creating the **btd-local** network.

```bash
docker-compose up -d --build
```