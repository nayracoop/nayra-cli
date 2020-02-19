# nayra-cli

Command line tool for boilerplating commonly-used code structures.

<img src="https://img.shields.io/badge/license-GPL--3-brightgreen" alt="license GNU General Public License v3.0"><img src="https://img.shields.io/badge/release-0.0.0-orange" alt="release version 0.0.0">

 :sparkles: **This project doesn't have any published versions yet** :sparkles:

Currently has script **```nayra-api```** for creating from scratch a ready-to-use API folder structure with admin user, and adding resources to it. You can see the base API code in [nayra-cms-api](https://github.com/nayracoop/nayra-cms-api)

## Installation

Clone repo, run 
**`npm install`**
to install dependencies and then
**`npm link`** 
to access all nayra-cli scripts globally.

## Pre-requirements

To run the API project created with this tool, you must have Node v^8.16.0 and MongoDB v^3.4.20 installed globally on your computer. 

## Usage

### Creating a new API project
 :zap:To create a new API folder structure inside root directory run
**`nayra-api init`**
and provide information about project to be created.

 :zap:Inside created directory, create a **`.env`** file copying **`.env-example`** replacing the information with your environment information and JWT secret key.
 
 :zap: Run **`npm install`** and then
**`npm run migrations`**
so a super-admin user is created onto DB with provided username and password.

 :zap:Then run
**`npm run dev`**
to start the API in dev environment! That's it! You can login with the username and password provided on init.

### Creating a new resources on the project
 :zap:To create new resources inside API (with model, endpoints and tests), run
**`nayra-api add-resource`** and provide information about new entity's name and model's fields names and types. 
The new resource's folder gets created in the /api folder, with model, basic controller, endpoints and tests. Also routes are registered in the routes index. You can start creating and managing new resources with your user account loged in right away! 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0] GNU General Public License v3.0
