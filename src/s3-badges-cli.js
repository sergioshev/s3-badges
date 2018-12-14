#!/usr/bin/env node

'use strict'

const {BadgeFactory} = require('gh-badges')
const expandTilde = require('expand-tilde')

const appname = 's3-badges';

//TODO: add support for multiple providers
var config = require('rc')(appname, {
	projectRoot: ".",
	projectName: "default",
	s3Bucket: 'copa-badges',
	awsZone: "us-west-2",
	awsAccessKeyId: "",
	awsSecretAccessKey: "",
	coverageCriticalLevel: "50", //percentage
	coverageWarnLevel: "80",
	subject: "coverage",
	//relative to projectRoot
	subjectDataSource: "coverage/coverage-summary.json"
});

config.projectRoot = expandTilde(config.projectRoot);


//TODO: in multiple scenario, for each provider upload 
//using each uploader
var uploaders = require('./uploaders');
var providers = require('./providers');

var badgeData = providers.istanbul.coverage(config);
 
var bf = new BadgeFactory()
var format = {
  text: [config.subject, badgeData.value],
  colorscheme: badgeData.color,
  template: 'flat',
}
 
const svg = bf.create(format)

uploaders.s3(config, svg)
  .then((link) => {
  	console.log(`${link} created`)
  })
  .catch(err => console.error(err))