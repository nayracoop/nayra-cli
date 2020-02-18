const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen");
const { createSuperAdminMigration } = require("../utils/migration");
const log = require("../utils/logger");
const git = require("download-git-repo");

const fs = require('fs')
const https = require('https')

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, function (response) {
      response.pipe(file);
      file.on('finish', function () {
          file.close(cb);  // close() is async, call cb after close completes.
      });
  }).on('error', function (err) { // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
  });
};

function askInitialQuestions() {
  const questions = [
    {
      name: "appName",
      type: "input",
      message: `Enter a ${chalk.keyword("orange")("name")} of your project`,
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
      message: "Enter username (alphanumeric and dashes, no spaces, 5-20 characters)",
      validate: (value) => {
        const match = value.match(/^(?=.{5,20}$)[0-9a-zA-Z_-]+$/);
        return (match) ? true : "Please provide a valid username (alphanumeric and dashes, no spaces, 5-20 characters)";
      }
    },
    {
      name: "email",
      type: "input",
      message: "Enter email"
    },
    {
      name: "password",
      type: "password",
      message: "Enter password",
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

const initializeCms = async () => {

  const initData = await askInitialQuestions();
  const {appName, username, email, password } = initData;

  log.info("\nDownloading last version of Nayra CMS API from Github...");
  try {
    git("nayracoop/nayra-cms-api", `./${appName}`, (err) => {
      if (err) log.error(err)

      // uses the sync file system 
      createSuperAdminMigration({ appName, username, email, password });
    });
  } catch (e) {
    if (e instanceof TypeError) {
      log.error(e);
    } else {
      log.error(e);
    }
  }

  log.info(boxen(`The cms ${chalk.keyword("darkorange")(initData.appName)} has been created! \n`
    + `Please run ${chalk.yellow(`\"cd ${initData.appName} && npm install\"`)} to install dependencies.\n\n`
    + `Then run ${chalk.yellow("\"npm run migrations\"")} to create user and account in data base.\n\n`
    + `To start the app in dev mode run ${chalk.yellow("\"npm run dev\"")}.\n`
    + `You can login using username ${chalk.keyword("darkorange")(initData.username)} and password. \n`
    + "\nUse --help to see all cli commands",
    { padding: 1 }));
};

module.exports = {
  initializeCms
};
