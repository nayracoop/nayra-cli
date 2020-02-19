const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
const log = require("./logger");

const cliHeader = (title) => {
  // clean the console
  const string = title || "NAYRA CLI";
  clear();
  // some unnecessary but nice ascii art
  log.info(
    chalk.keyword("cyan")(
      figlet.textSync(
        string,
        {
          horizontalLayout: "full",
          font: "Cybermedium"
        }
      )
    )
  );
};

module.exports = { cliHeader };
