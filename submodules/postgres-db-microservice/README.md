# Postgres Db Microservice
For use in creating a postgres database that can be spun up with Docker

## Setup Instructions

### 1. Configure Environment Variables

Create a `.emv` file in the project root using `env.example` for reference

```env
POSTGRES_DB=postgres
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
```

This forms as an entry point for any local db setup.

### 2. Spin up postgres container locally

Spinning up a postgres container can be done by running `docker-compose up -d` in one of two different places:

1. Inside of this folder 
  - useful for when only wanting to launch the postgres db and nothing else.

2. If this repo is used as a submodule inside of a master project, run the command in that project to launch. 
  - For example, inside of (BTD-Core)[https://github.com/jimmybombimmy/BTD-Core], which is a master repo for BTD and will launch all submodules (this being one of them). 
  - Useful for if the master project needs to change some env variables or work within a specific docker network.

2 is the preferable option if wanting to run all BTD microservices locally.
It is also the only option that is configured with a docker network that can be used to link together all microservices locally.