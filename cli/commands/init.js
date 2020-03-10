const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen");
const { createSuperAdminMigration } = require("../utils/migration");
const log = require("../utils/logger");
const git = require("download-git-repo");

const fs = require('fs');
const https = require('https');
const { askInitialQuestions } = require("./questions");

// not in use yet
function askInstallDependeciesNow(){
  return inquirer.prompt(
    {
      name: "install",
      message: "Do you want to install dependencies now?",
      type: "confirm",
      default: true
    }
  );
}

function showInstructions(initData) {
  log.info(boxen(`The cms ${chalk.keyword("dodgerblue")(initData.appName)} has been created! \n`
  + `Please run ${chalk.yellow(`\"cd ${initData.appName} && npm install\"`)} to install dependencies.\n\n`
  + `${chalk.cyan("DONT FORGET to copy .env-example into .env file")}\n`
  + `${chalk.cyan("and replace with custom env data and keys!!")}\n\n`
  + `To create superadmin in data base, run ${chalk.yellow("\"npm run migrations\"")}.\n`
  + `To start the app in dev mode run ${chalk.yellow("\"npm run dev\"")}.\n`
  + `You can login using username ${chalk.keyword("mediumseagreen")(initData.username)} and password. \n`
  + "\nUse --help to see all cli commands",
  { padding: 1 }));
}

function editPackageData(appName) {
  let rawdata = fs.readFileSync(`./${appName}/package.json`);
  let package = JSON.parse(rawdata);
  package.name = appName;
  let data = JSON.stringify(package, null, 2);
  fs.writeFileSync(`./${appName}/package.json`, data);
}

const initializeCms = async () => {
  const initData = await askInitialQuestions();
  const {appName, username, email, password } = initData;

  log.info("\nDownloading last version of Nayra CMS API from Github...");
  git("nayracoop/nayra-cms-api", `./${appName}`, (err) => {
    if (err) log.error(err);
    // uses the sync file system 
    createSuperAdminMigration({ appName, username, email, password });
    // change sync the app name in the package
    editPackageData(appName);
    showInstructions(initData);
  });
};

module.exports = {
  initializeCms
};
