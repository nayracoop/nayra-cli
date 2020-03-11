const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen");
const migrationHelper = require("../utils/migration");
const log = require("../utils/logger");
const files = require("../utils/files");
const questions = require("./questions");

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

const initializeCms = async () => {
  const initData = await questions.askInitialQuestions();
  const {appName, username, email, password } = initData;

  log.info("\nDownloading last version of Nayra CMS API from Github...");
  files.downloadRepo("nayracoop/nayra-cms-api", `./${appName}`, (err) => {
    if (err) 
      return log.error(err);

    try {
      // uses the sync file system 
      migrationHelper.createSuperAdminMigration({ appName, username, email, password });
      // change sync the app name in the package
      files.editPackageData(appName);
      showInstructions(initData);
    } catch (error) {
      log.error(err)
    }
  });
};

module.exports = {
  initializeCms
};
