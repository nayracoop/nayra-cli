# nayra-cli

Command line tool for boilerplating commonly-used code structures.
This is a work in progress. 
Currently it can create from scratch a cms API and add resources to it with script ```nayra-api```

## Installation

Clone repo, run 
```npm install```
to install dependencies and then
```npm link``` 
to access nayra-cli scripts globally.

Also, you have to have installed globally node and mongo ? 

## Usage

To create a new API folder structure inside current directory run
```nayra-api init
```
and provide information about project to be created.

Inside created directory run 
```npm run migrations
```
so a super-admin user is created onto DB with provided username and password.

To create new resources inside API (with model, endpoints and tests), run
```nayra-api add-resource
```
and provide information about new entity's name and model's fields names and type. 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)