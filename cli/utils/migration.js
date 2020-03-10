const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const log = require("./logger");

require("dotenv").config({ path: "../.env" });

const timestamp = Date.now();

function basicMigration() {
  const destinationFileName = `../${process.env.MIGRATIONS_FOLDER}/${timestamp}_${process.argv[2]}.js`;
  const template = `
  //migration for ${destinationFileName}
    const path = require("path");
  
  exports.getVersion = () => {
    return __filename.replace(path.join(__dirname, '/'), '');
  }
  
  exports.up = async (db, cb) => {
    cb(null, true);
  }
  `;

  try {
    fs.writeFileSync(destinationFileName, template);
    log.info(`Created migration template ${destinationFileName}`);
  } catch (err) {
    log.error(`An error ocurred creating migration template: ${err}`);
  }
}

// in this case is prefered to use sync file writing
function createSuperAdminMigration({ appName, username, email, password }) {
  const templateFileName = path.join(__dirname, "..", "templates", "migration.template.js.ejs");
  const workingDirectory = process.cwd();
  const destinationFileName = path.join(workingDirectory, appName,`tasks/migrations/${timestamp}_create_super_admin_user.js`);

  const template = fs.readFileSync(templateFileName, "utf8");

  const contents = ejs.render(template, {
    cliPassword: password,
    cliUsername: username,
    cliEmail: email
  });
  
  try {
    fs.writeFileSync(destinationFileName, contents);
    log.info(`Created superadmin migration ${destinationFileName}`);
  } catch (err) {
    log.error(`An error ocurred creating migration template: ${err}`);
  }
}

module.exports = ({
  basicMigration,
  createSuperAdminMigration
});
