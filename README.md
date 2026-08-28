Find [here](https://github.com/elixir-europe/beacon-network-backend) the Beacon Network Backend repository.

## Instructions on how to deploy the Beacon Network User Interface

You will need to have created your Life Science and Keycloak environments before.
Tip: for Life Science environment, please first [create a user](https://lifescience-ri.eu/ls-login/users/how-to-get-and-use-life-science-id.html) . After that you will need to register a service registry in order to be able to administrate your logins. Please go [here](https://services.aai.lifescience-ri.eu/spreg/) and ask for a New Service - type OIDC -.



Now please proceed to execute the next command in order to deploy the UI.
 
 ```bash
docker-compose up -d –build
```

Then please edit the file config.json, which can be found inside folder [frontend/public](https://github.com/elixir-europe/beacon-network-ui/tree/main/frontend/public). This file is read by the UI at startup, so it can be swapped per environment without rebuilding the app. You need to decide where you want the UI to point to when making requests, and fill in your Life Science and Keycloak credentials. Find below an example:

 ```bash
{
   "API_URL": "https://yourAPIdomain.com/beacon-network/v2.0.0",
   "REDIRECT_URL": "https://yourUIdomain.com",
   "KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com",
   "CLIENT_ID": "ID of your LS Login",
   "CLIENT_SECRET": "password of your LS Login",
   "KEYCLOAK_CLIENT_SECRET": "password of your Keycloak login"
 }
```
