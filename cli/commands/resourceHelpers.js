
// be careful this env is the env of the API installation
require("dotenv").config();
const chalk = require("chalk");
const boxen = require("boxen");

const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const log = require("../utils/logger");
const { capitalize } = require("../utils/text");
const files = require("../utils/files");
const routeRegister = require("../utils/route_register");
const questions = require("./questions");

const addNewResource = async () => {
  let { modelName, modelNamePlural } = await questions.askResourceQuestions();
  const fieldList = [];
  let continueAskingFields = true;

  // ask for fields - not generating the schema template yet (WIP)
  log.info("\n");
  log.info(`Insert the fields for ${chalk.keyword("coral")(modelName)} schema`);
  while (continueAskingFields) {
    const { addNew, fieldName, fieldType, fieldProps } = await questions.askSchemaFields();
    fieldList.push({ fieldName, fieldType, fieldProps });
    continueAskingFields = addNew;
    log.info(`${chalk.keyword("yellow")("-------------------------")}`);
  }

  const modelNameLower = modelName.toLowerCase();
  const modelNamePluralLower = modelNamePlural.toLowerCase();
  modelName = modelNameLower.charAt(0).toUpperCase() + modelNameLower.slice(1);
  modelNamePlural = modelNamePluralLower.charAt(0).toUpperCase() + modelNamePluralLower.slice(1);
  const templateData = {
    modelName,
    modelNameLower,
    modelNamePlural,
    modelNamePluralLower,
    fieldList
  };
  const templatePath = path.join(__dirname, "..", "templates", "resources");

  const filesToCreate = fs.readdirSync(templatePath);

  const workingDirectory = process.cwd();

  const resourcePath = path.join(workingDirectory, "server/api", modelNameLower);
  files.createDir(resourcePath);

  filesToCreate.forEach((file) => {
    const templateFilePath = path.join(templatePath, file);

    let fileContents = fs.readFileSync(templateFilePath, "utf8");
    fileContents = ejs.render(fileContents, templateData);
    const index = file.indexOf(".");
    if (index > 0) {
      const folderName = file.substring(0, index);
      const destinationFolderPath = path.join(workingDirectory, "server", "api", modelNameLower, folderName);
      let destinationFilePath = null;

      if (folderName === "test") {
        destinationFilePath = path.join(workingDirectory, "server", "api", modelNameLower, folderName, `${modelNameLower}.${folderName}.js`);
      } else {
        destinationFilePath = path.join(workingDirectory, "server", "api", modelNameLower, folderName, `${modelNameLower}-${folderName}.js`);
      }

      files.createDir(destinationFolderPath);
      files.createFile(destinationFilePath, fileContents);
    }
  });
  
  routeRegister.newRoute(modelNameLower, workingDirectory);

  log.info(boxen(`Resource ${chalk.keyword("coral")(modelName)} has been created succesfully!`, { padding: 1 }));
};

module.exports = {
  addNewResource
};
