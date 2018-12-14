var aws = require('aws-sdk')
var https = require('https')

function buildFileName(config) {
	return `${config.projectName}-${config.subject}.svg`;
}

module.exports = (config, bytes) => {
	aws.config.update({
		accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey
  });

  var contents = new Buffer.from(bytes, 'binary');
  var s3 = new aws.S3();

  return new Promise((resolve, reject) => {
    const fileName = buildFileName(config);
    const link = `https://s3-${config.awsZone}.amazonaws.com/${config.s3Bucket}/${fileName}`
    s3.putObject({
      Bucket: `${config.s3Bucket}`,
      Key: fileName,
      Body: contents,
      ACL: 'public-read',
      ContentType: 'image/svg+xml;charset=utf-8'
    }, function (err, res) {
    	if (err) {
    		reject(err)
    	} else { 
        console.log('Successfully uploaded package.');
        return resolve(link);
      }
    }); 
  });
}

