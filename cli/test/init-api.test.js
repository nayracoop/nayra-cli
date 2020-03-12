const { expect, assert}  = require("chai");
const sandbox = require("sinon").createSandbox();
const { initializeCms } = require("../commands/init");
const chance = require("chance").Chance();

// sinon spy/stub targets
const files = require("../utils/files");
const migrationHelper = require("../utils/migration");
const questions = require("../commands/questions");

const appName = "testApp";
const username = "Tobaias";
const email = "tobaias@nayra.coop";
const password = "notSecure";

let downloadRepoStub, editPackageDataStub, createSuperAdminMigrationStub, askInitialQuestionsStub;

describe("init-api command", (done) => {
  beforeEach((done) => {
    downloadRepoStub = sandbox.stub(files, "downloadRepo").callsFake((a,b, cb) => {cb();});
    editPackageDataStub = sandbox.stub(files, "editPackageData").returns(true);
    createSuperAdminMigrationStub = sandbox.stub(migrationHelper, "createSuperAdminMigration").returns(true);
    askInitialQuestionsStub = sandbox.stub(questions, "askInitialQuestions").returns({ appName, username, email, password });
    done();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should do the initial procedures for creating the api", async () => {
    await initializeCms();
    assert(askInitialQuestionsStub.calledOnce, "questions called more than once");
    assert(askInitialQuestionsStub.calledBefore(downloadRepoStub), "questions should be asked before");
    assert(downloadRepoStub.calledOnce, "files.downloadRepo called more than once");
  });
});
