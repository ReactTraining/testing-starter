// Since Windows cannot run bash scripts, we do this in Node now. Here was the old bash script
// for reference: $ find . -iname db-seed.json | xargs -L1 -I {} bash -c 'cp {} $(dirname {})/db.json'

const path = require("path");
const shell = require("shelljs");
const rootDir = process.cwd();
const appPath = path.join(rootDir, "src");
const dbPath = path.join(appPath, "database");

main();

function main() {
  try {
    shell.cp(`${dbPath}/db-seed.json`, `${dbPath}/db.json`);
  } catch (err) {
    //
  }
}
