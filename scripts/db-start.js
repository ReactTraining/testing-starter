const path = require("path");
const fs = require("fs");
const concurrently = require("concurrently");
const rootDir = process.cwd();
const appPath = path.join(rootDir, "src");
const dbPath = path.join(appPath, "database");
const dbFilePath = path.join(dbPath, "db.json");

main();

function main() {
  // This allows the database to run in the background
  if (fs.existsSync(dbFilePath)) {
    concurrently([
      {
        command: `npx json-server --watch ${dbFilePath} -p 3030 --quiet`,
        name: "npx json-server database",
      },
    ]).catch((err) => {
      console.error(
        "JSON-SERVER was not able to start. Its port 3030 might still be open from a previous run. Try running `npm run db:kill` to kill the port\n\n"
      );
      console.error(err);
      process.exit(1);
    });
  } else {
    console.error(`db.json is missing at path ${dbFilePath}`);
    console.error("Try running `npm run create-db`");
    process.exit(1);
  }
}
