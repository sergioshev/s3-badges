var fs = require('fs');

// should return {value,color} 
function coverage(config) {
  let json = fs.readFileSync(
  	`${config.projectRoot}/${config.subjectDataSource}`
  ).toString();

  let value = 0;
  let color = 'red';

  json = JSON.parse(json);

  if (json && json.total && json.total.lines &&
    json.total.lines.pct) {
    value = json.total.lines.pct;
  }
  
  if (value > config.coverageWarnLevel) {color = 'green'}
    else if (value > config.coverageCriticalLevel) {color = 'orange'}
   
  value = `${value}%`;
  console.log(`istanbul-coverage {${value},${color}}`);
  return {value, color};
}    

module.exports = {
	coverage 
}