# nayra-cli

Command line tool for boilerplating commonly-used code structures.
This is a work in progress. 
Currently has script ```nayra-api``` for creating from scratch a ready-to-use API folder structure with admin user, and adding resources to it. 

## Installation

Clone repo, run 
```npm install```
to install dependencies and then
```npm link``` 
to access nayra-cli scripts globally.

## Usage

To create a new API folder structure inside current directory run
```nayra-api init```
and provide information about project to be created.

Inside created directory run 
```npm run migrations```
so a super-admin user is created onto DB with provided username and password.

To create new resources inside API (with model, endpoints and tests), run
```nayra-api add-resource```
and provide information about new entity's name and model's fields names and type. 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0]