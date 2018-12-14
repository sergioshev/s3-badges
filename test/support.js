var fs = require('fs');
var chai = require('chai');
var sinon = require('sinon-chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(sinon);
chai.use(chaiAsPromised);

global.chai = chai;

global.config = {
	projectRoot: "/tmp",
	projectName: "default",
	s3Bucket: 'copa-badges',
	awsZone: "us-west-2",
	awsAccessKeyId: "",
	awsSecretAccessKey: "",
	coverageCriticalLevel: "50", //percentage
	coverageWarnLevel: "80",
	subject: "coverage",
	subjectDataSource: "coverage-summary.json"
}

global.writeReport = (config, json) => {
  fs.writeFileSync(
  	`${config.projectRoot}/${config.subjectDataSource}`,
  	JSON.stringify(json)
  )
}