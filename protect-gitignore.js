const fs = require('fs');
const path = require('path');

const GITIGNORE_PATH = path.resolve(__dirname, '.gitignore');
const GITIGNORE_HASH_PATH = path.resolve(__dirname, '.gitignore.hash');
const crypto = require('crypto');

function hashFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function saveHash(hash) {
  fs.writeFileSync(GITIGNORE_HASH_PATH, hash, 'utf8');
}

function loadHash() {
  if (!fs.existsSync(GITIGNORE_HASH_PATH)) return null;
  return fs.readFileSync(GITIGNORE_HASH_PATH, 'utf8');
}

function checkGitignoreIntegrity() {
  const currentHash = hashFile(GITIGNORE_PATH);
  const savedHash = loadHash();
  if (savedHash && currentHash !== savedHash) {
    console.error('\nERROR: .gitignore file has been modified!\nIf this was not intentional, please review the changes.');
    process.exit(1);
  }
}

function updateGitignoreHash() {
  const currentHash = hashFile(GITIGNORE_PATH);
  if (currentHash) saveHash(currentHash);
}

// If run as preinstall, check integrity
if (process.env.npm_lifecycle_event === 'preinstall') {
  checkGitignoreIntegrity();
}
// If run as postinstall, update hash (for intentional changes)
if (process.env.npm_lifecycle_event === 'postinstall') {
  updateGitignoreHash();
}
