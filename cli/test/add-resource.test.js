const { expect, assert}  = require("chai");
const sandbox = require("sinon").createSandbox();
const resourceHelpers = require("../commands/resourceHelpers");
const questions = require("../commands/questions");
const files = require("../utils/files");
const fs = require("fs");
const path = require("path");

let spyConsole = null;
let stubFiles = null;
let stubDir = null;

const modelName = "gatito";
const modelNamePlural = "gatitos";

const resourceFolders = [
  "controller", "dao", "model", "routes", "test"
];

describe("add-resource", () => {
  beforeEach(() => {

    registerRoutesStub = sandbox.stub(resourceHelpers, "registerNewRoutes").returns(1);

    askResourceQuestionsStub = sandbox.stub(questions, "askResourceQuestions").returns({ modelName, modelNamePlural });
    askSchemaFieldsStub = sandbox.stub(questions, "askSchemaFields");

    askSchemaFieldsStub.onCall(0).returns({
      addNew: true, fieldName: "name", fieldType: "String", fieldProps : {required: true}
    });
    askSchemaFieldsStub.onCall(1).returns({
      addNew: false, fieldName: "age", fieldType: "Number", fieldProps : {required: true}
    });

    mockRoutesConfig = path.join(__dirname, "./fs/mock-routes.config.js");
    readFileStub = sandbox.stub(files, "readFile").returns(fs.readFileSync(mockRoutesConfig, "utf8"));
    createFileStub = sandbox.stub(files, "createFile").returns(true);
    createDirStub = sandbox.stub(files, "createDir").returns(true);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should create a resource scaffold with the given model name", async () => {
    await resourceHelpers.addNewResource();
    /* WIP */
    //  resource folder and modules: "controller", "dao", "model", "routes", "test"
    expect(createDirStub.callCount).to.be.eql(6);
    expect(createDirStub.firstCall.args[0]).to.be.eql(`${process.cwd()}/server/api/${modelName}`);

    // // resource sub folders
    for (let i = 0; i < resourceFolders.length; i++) {
      expect(createDirStub.getCall(i + 1).args[0]).to.be.eql(`${process.cwd()}/server/api/${modelName}/${resourceFolders[i]}`);
      if(resourceFolders[i] == "test") {
        expect(createFileStub.getCall(i).args[0]).to.be.eql(`${process.cwd()}/server/api/${modelName}/${resourceFolders[i]}/${modelName}.${resourceFolders[i]}.js`);
      } else {
        expect(createFileStub.getCall(i).args[0]).to.be.eql(`${process.cwd()}/server/api/${modelName}/${resourceFolders[i]}/${modelName}-${resourceFolders[i]}.js`);
      }
      
    }

    // assert(spyConsole.withArgs(`Creating api resources for: ${name}`).calledOnce);
    // assert(spyConsole.withArgs(`created new folder ../server/api/${name}`).calledOnce);

  });

  // TO DO
  it.skip("register new route", () => {
    registerNewRoutes("media");
  });
});
