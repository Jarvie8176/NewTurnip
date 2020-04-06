const path = require("path");
const glob = require("glob");
const _ = require("lodash");
const fs = require("fs");

const absRootPath = path.join(__dirname, "..");
const outputPath = path.join(absRootPath, "coverage");
const outputFilename = "coverage-all.json";

function convertContent(coverageContent) {
  return _.chain(coverageContent)
    .map((val, key) => ({
      key: path.relative(absRootPath, key),
      val: { ...val, path: path.relative(absRootPath, val.path) },
    }))
    .keyBy("key")
    .mapValues("val")
    .value();
}

(async () => {
  const coverageFilePattern = path.join(absRootPath, "packages/*/coverage/*.json");
  const filePaths = await new Promise((resolve, reject) => {
    glob(coverageFilePattern, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

  const coverageContents = _.chain(filePaths).map(require).map(convertContent).value();
  const result = _.merge(...coverageContents);
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, outputFilename), JSON.stringify(result));
})();
