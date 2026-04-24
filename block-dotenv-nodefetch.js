const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const forbidden = ['dotenv', 'node-fetch'];
const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies, pkg.optionalDependencies);
const found = forbidden.filter(f => deps && deps[f]);
if (found.length) {
  console.error(`\nERROR: Forbidden packages detected: ${found.join(', ')}.\nRemove them from package.json to continue.\n`);
  process.exit(1);
}