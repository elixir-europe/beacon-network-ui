Find [here] (https://github.com/elixir-europe/beacon-network-backend) the Beacon Network Backend repository.

## Instructions on how to deploy the Beacon Network User Interface

Please first create a .env file inside the frontend folder so that you can modify some variables as follows:

```bash
REACT_APP_CLIENT_ID="ID of your LS Login"
REACT_APP_CLIENT_SECRET="password of your LS Login"
REACT_APP_KEYCLOAK_CLIENT_SECRET="password of your Keycloak login"
```

You will need to have created your Life Science and Keycloak environments before.

Take into account that the above file will not be copied to GitHub as it contains keys and for security reasons it should ignored.


After that please proceed to execute the next command in order to deploy the UI.
 
 ```bash
docker-compose up -d –build
```

Then please edit the file config.json, which can be found inside folder [frontend/src](https://github.com/elixir-europe/beacon-network-ui/tree/main/frontend/src). You need to decide where you want the UI to point to when making requests. Find below an example:

 ```bash
{
   "API_URL": "https://yourAPIdomain.com/beacon-network/v2.0.0",
   "REDIRECT_URL": "https://yourUIdomain.com",
   "KEYCLOAK_URL": "https://yourKEYCLOAKdomain.com"
 }
```

Finally, please include the URL of your User interface to the file beacon/__main__.py (line 103), so that it becomes part of the list of URLs accepted by CORS.


Note that in the root folder (frontend) you will find a file called .gitignore with the list of all files that need to be ignored.
