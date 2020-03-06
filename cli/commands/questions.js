const inquirer = require("inquirer");
const chalk = require("chalk");

const askResourceQuestions = () => {
  const questions = [
    {
      name: "modelName",
      type: "input",
      message: `Enter the name of the new model (singular)`,
      validate: (value) => {
        const match = value.match(/^(?=.{2,30}$)[0-9a-zA-Z]+$/);
        return (match) ? true : "Please provide a valid plural model name (only alphanumeric characters, no spaces)";
      }
    },
    {
      name: "modelNamePlural",
      type: "input",
      message: `Enter the plural name of the new model`,
      validate: (value) => {
        const match = value.match(/^(?=.{2,30}$)[0-9a-zA-Z]+$/);
        return (match) ? true : "Please provide a valid plural model name (only alphanumeric characters, no spaces)";
      }
    }
  ];
  return inquirer.prompt(questions);
}

const askSchemaFields = () => {
  const questions = [
    {
      name: "fieldName",
      type: "input",
      message: `Enter the ${chalk.keyword("mediumseagreen")("field name")} using camel case:`
    },
    {
      name: "fieldType",
      type: "list",
      message: `Select the ${chalk.keyword("mediumseagreen")("field type")} from the following list:`,
      choices: [
        "String",
        "Number", 
        "Date",
        "Buffer",
        "Boolean",
        // "Mixed",
        { value: "mongoose.Schema.Types.ObjectId", name: "ObjectId" },
        "Array",
        "Decimal128",
        "Map"
      ]
    },
    {
      name: "fieldProps",
      type: "checkbox",
      message: `Select with space bar if the field is ${chalk.keyword("mediumseagreen")("required")} and/or ${chalk.keyword("mediumseagreen")("unique")} or none:`,
      choices: ["required", "unique"]
    },
    {
      name: "addNew",
      message: "Add a new field?",
      type: "confirm",
      default: true
    }
  ];

  return inquirer.prompt(questions);
}

const askInitialQuestions = () => {
  const questions = [
    {
      name: "appName",
      type: "input",
      message: `Enter a name for your API project`,
      validate: (value) => {
        if (value) {
          const match = value.match(/^(?=.{5,20}$)[0-9a-zA-Z_-]+$/);
          return (match) ? true : "Please provide a valid username (alphanumeric and dashes, no spaces, 5-20 characters)";
        }
        return "Please don't forget to enter your app name!";
      }
    },
    {
      name: "username",
      type: "input",
      message: "Enter username for the API superadmin(alphanumeric and dashes, no spaces, 5-20 characters)",
      validate: (value) => {
        const match = value.match(/^(?=.{5,20}$)[0-9a-zA-Z_-]+$/);
        return (match) ? true : "Please provide a valid username (alphanumeric and dashes, no spaces, 5-20 characters)";
      }
    },
    {
      name: "email",
      type: "input",
      message: "Enter email for the API superadmin"
    },
    {
      name: "password",
      type: "password",
      message: "Enter password for the API superadmin",
      mask: "*",
      validate: (value) => {
        if (value.length > 5) {
          return true;
        }
        return "Please provide a password of at least 6 characters";
      }
    },
    // // kept here for future versions - not being used right now
    // {
    //   name: "userTypes",
    //   type: "checkbox",
    //   message: "Select user types needed",
    //   choices: [
    //     { value: "guest", name: " Guest - access restricted data, can't edit, no login", short: "Guest" },
    //     { value: "editor", name: " Editor - access restricted data, can edit, login", short: "Editor" }
    //   ]
    // }
  ];
  return inquirer.prompt(questions);
}

module.exports = {
  askResourceQuestions,
  askSchemaFields,
  askInitialQuestions
};