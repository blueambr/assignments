const fs = require("fs");
const data = require("./data/index.json");
const getFilteredClicks = require("./modules/getFilteredClicks");

const result = getFilteredClicks(data);

// Output result to console
console.info("Result:\n", result);

// Output result to resultset.json file in the dist folder with 2 spaces indentation
fs.writeFileSync("./dist/resultset.json", JSON.stringify(result, null, 2));

// Flavoring
console.info("\nClicks solution:\n🏁 Finished\n✅ Success");
