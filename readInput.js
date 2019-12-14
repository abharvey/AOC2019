const fs = require("fs");

function getInput(filePath, callBack, delimiter = "\n") {
  const readInput = cb => (error, input) => {
    if (error) {
      console.error("ERROR:", error);
    }
    const inputArray = input.split(delimiter);
    cb(inputArray);
  };

  fs.readFile(`${filePath}`, "UTF8", readInput(callBack));
}

module.exports = {
  getInput
};
