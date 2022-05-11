const args = process.argv.slice(2);
const url = args[0];
const pathToFile = args[1];
const fs = require("fs");
const path = require("path");
const request = require("request");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(url, (error, response, body) => {
  if (error) {
    console.log("URL is Invalid");
    process.exit();
  }
  fs.access(pathToFile, (error) => {
    if (error) {
      console.log("File path is invalid!");
      process.exit();
    }
    if (!error) {
      readline.question(
        `File exists. Do you want to overwrite it? `,
        (line) => {
          if (line !== "y" && line !== "Y") {
            process.exit();
          }
          fs.writeFile(pathToFile, body, (err) => {
            if (err) throw err;
            console.log(
              `Downloaded and save ${body.length} bytes to ${pathToFile}`
            );
            readline.close();
          });
        }
      );
    }
  });
});
