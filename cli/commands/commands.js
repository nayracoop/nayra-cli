const commander = require("commander");
const log = require("../utils/logger");
const { cliHeader } = require("../utils/header");
const { initializeCms } = require("./init");
const ResourceHelper = require("./resourceHelpers");

const program = new commander.Command();

// version
program.version("nayra cms cli v0.0.0");


// actions list
program
  .command("init-api")
  .description("handle the CMS installation and basic configuration")
  .action(() => {
    cliHeader("NAYRA CLI API Init");
    initializeCms();
  });

program
  .command("add-resource")
  .description("creates a new API REST resource")
  .action(() => {
    cliHeader("CLI add resource");
    ResourceHelper.addNewResource();
  });

module.exports = {
  program
};
