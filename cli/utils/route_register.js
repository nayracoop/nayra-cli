const path = require("path");
const files = require("../utils/files");
const text = require("../utils/text");

/**
 * read route file for register new routes
 */
const newRoute = (resourceSingular, workingDirectory) => {
  // these markers are used to find the required line numbers for route registering
  const routeFileMarker = /route definition/;
  const routeInitMarker = /routes initializers/;

  let fileLineNumber = null;
  let initLineNumber = null;

  const routesConfig = path.join(workingDirectory, "server/config/routes.config.js");
  const data = files.readFile(routesConfig).split("\n");

  // search for marker strings and get line numbers. maybe not the best way
  data.forEach((line, index) => {
    if (line.match(routeFileMarker)) {
      fileLineNumber = index;
    }

    if (line.match(routeInitMarker)) {
      initLineNumber = index;
    }
  });

  if (fileLineNumber && initLineNumber) {
    const cap = text.capitalize(resourceSingular); 
    data.splice(fileLineNumber, 0, `const { ${cap}Routes } = require("../api/${resourceSingular}/routes/${resourceSingular}-routes");\n`);
    data.splice(initLineNumber, 0, `    ${cap}Routes.init(router);`);
    const fileText = data.join("\n");
    files.createFile(routesConfig, fileText);
  }
};

module.exports = {
  newRoute
}