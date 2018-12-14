# s3-badges

Custom coverage badge generation and aws-s3 publishing

Currently suported:
1. Istanbul coverage report
2. Upload to s3 bucket (static web mode)

# Configure your project

Install the package
```javascript
npm install s3-badges
```

Configure your project to with necesary info for badge generation.
You have an _.s3-badgesrc.example_ you should paste in root folder
with some options to configure.

_.s3-badgesrc_ minimal contents (JSON format)

```javascript
{
  "projectName": "dms",
  "awsAccessKeyId": "Your access key",
  "awsSecretAccessKey": "Your secret key"
}
```

Configure your _package.json_ file to enable coverage report generation
Add this line. Assuming you already have __good working__ _test_ command.

```
...
"test:coverage": "nyc --reporter=json-summary test",
...
```

# Usage

```bash
npm run test:coverage

npx update-badges

istanbul-coverage {69.17%,orange}
Successfully uploaded package.
https://s3-<ZONE>.amazonaws.com/<BUCKET>/<PROJECT_NAME>-coverage.svg created
```

Now you can paste reported badge's link in your README.md file.

