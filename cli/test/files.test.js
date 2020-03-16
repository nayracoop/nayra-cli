const { expect, assert}  = require("chai");
const sandbox = require("sinon").createSandbox();
const { initializeCms } = require("../commands/init");
const chance = require("chance").Chance();
const fs = require("fs");
const mock = require("mock-fs");
const files = require("../utils/files");


const appName = "paletobich";
const packagePath = `./${appName}/package.json`;


describe("Files utilities", () => {
  beforeEach(() => {
    // maybe this is causing utils/files.js is not coverered
    mock({
      [packagePath]: '{"name":"nayra-cli", "version":"fakeNumber"}'
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should change the package.json data", (done) => {
    files.editPackageData(appName);
    let rawdata = fs.readFileSync(`./${appName}/package.json`);
    let package = JSON.parse(rawdata);
    assert(package.name === appName, "package.json name hasn't the app name");
    done();
  });
});