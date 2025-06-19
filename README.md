The core repo for hosting Bill Tracker Deluxe microservices (name subject to change)

### 2. Ensure that docker network is created

Run the following command to set up your docker network, so that it can be run with and connect to other microservices.

```bash
docker network create btd-local
```

In the `docker-compose.yml file`, this is setup to use the network of **btd-local**, as that relates to the project I'm using this for currently.

If you fork this repo and use it as a means to setup docker with another project, ensure that you change this network name and in any other linked repos.