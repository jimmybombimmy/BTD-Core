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

POSTGRES_USER=user123
POSTGRES_PASSWORD=pass
# POSTGRES_DATABASE will be set in each individual microservice that uses a db
```

This forms as an entry point for any local db setup.

### 2. Setup Submodules

Run the following script to setup the repos in the `/submodules` folder, pull from main and run `npm install`.

```bash
sh setup-submodules.sh
```

**WARNING:** this command will fail if you are not in the **main** branch in all of your submodules.

These submodules are also branch protected, so to make commits, you will have to go into the folder and follow any readme instructions to make a commit. 

Ensure you revert back to the **main** branch after you are done with your work so that the above command can be run.

### 3. Run docker-compose

Run the following command to set up your microservices in containers, while creating the **btd-local** network.

```bash
docker-compose up -d --build
```