const fs = require("fs");
const path = require("path");
const nfts = require("./nfts.json");

const resultMap = new Map();

nfts.forEach((obj) => {
  // Extract the number from the name format
  const key = Number(obj.name.split("#")[1]);
  resultMap.set(key, obj);
});

//   console.log(resultMap);
const newMap = new Map([...resultMap.entries()].sort((a, b) => a[0] - b[0]));

const outputFilePath = "./mapNfts.json";
fs.writeFileSync(outputFilePath, JSON.stringify(Object.fromEntries(newMap)) , 'utf-8');
console.log(`Merged data written to file: ${outputFilePath}`);
