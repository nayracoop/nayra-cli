const { expect, assert}  = require("chai");
const sandbox = require("sinon").createSandbox();
const { initializeCms } = require("../commands/init");
const chance = require("chance").Chance();

// sinon spy/stub targets
const files = require("../utils/files");
const git = require("../utils/git");
const log = require("../utils/logger");
const migrationHelper = require("../utils/migration");
const questions = require("../commands/questions");

const appName = "testApp";
const username = "Tobaias";
const email = "tobaias@nayra.coop";
const password = "notSecure";

let downloadRepoStub, editPackageDataStub, createSuperAdminMigrationStub, askInitialQuestionsStub;

describe("init-api command", (done) => {
  beforeEach(() => {
    editPackageDataStub = sandbox.stub(files, "editPackageData").returns(true);
    createSuperAdminMigrationStub = sandbox.stub(migrationHelper, "createSuperAdminMigration").returns(true);
    askInitialQuestionsStub = sandbox.stub(questions, "askInitialQuestions").returns({ appName, username, email, password });
    logErrorSpy = sandbox.spy(log, "error");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should do the initial procedures for creating the api", async () => {
    downloadRepoStub = sandbox.stub(git, "downloadRepo").callsFake((a,b, cb) => {cb();});
    await initializeCms();
    assert(askInitialQuestionsStub.calledOnce, "questions called more than once");
    assert(askInitialQuestionsStub.calledBefore(downloadRepoStub), "questions should be asked before");
    assert(downloadRepoStub.calledOnce, "files.downloadRepo called more than once");
  });

  it("should throw an error if can not download the CMS from GH", async () => {
    const errMessage = "An error ocurred whem retrieving the current Nayra CMS release:";
    const fakeCbErr = "fail";
    downloadRepoStub = sandbox.stub(git, "downloadRepo").callsFake((a,b, cb) => {cb(new Error(fakeCbErr));});
    
    await initializeCms();
    assert(logErrorSpy.calledTwice, "Should be two error messages when git download fails");
    assert(logErrorSpy.getCall(0).args[0] == errMessage,  "Wrong error message");
    assert(logErrorSpy.getCall(1).args[0] instanceof Error,  "Should log an Error instance");
  });

  it("should throw an error if something fails after downloading GH repo", async () => {
    downloadRepoStub = sandbox.stub(git, "downloadRepo").callsFake((a,b, cb) => {cb();});
    editPackageDataStub.throws();
    await initializeCms();
    assert(logErrorSpy.calledOnce, "Should be one error message if fails after download from GH");
    assert(logErrorSpy.getCall(0).args[0] instanceof Error,  "Should log an Error instance");
  });
});
