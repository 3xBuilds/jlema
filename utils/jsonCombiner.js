const fs = require('fs');
const path = require('path');

// Function to read and parse a JSON file
function readJSONFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      
      return JSON.parse(data) || []; // Return empty array if parsing fails or data is empty
    } catch (error) {
    //   console.error(`Error reading file ${filePath}:`, error);
      return [];
    }
  }

// Get the directory path containing the JSON files
const directoryPath = './jlema_jsons'; // Replace with your actual path

// Initialize an empty array to store merged data
const mergedData = [];

// Loop through files in the directory
fs.readdirSync(directoryPath).forEach(fileName => {
  // Check if the file is a JSON file
  if (path.extname(fileName) === '.json') {
    const filePath = path.join(directoryPath, fileName);
    const jsonData = readJSONFile(filePath);
    mergedData.push(jsonData);
  }
});

console.log(`Merged data:`, mergedData.length);

// Write the merged data to a new file
const outputFilePath = './merged_data.json'; // Replace with your desired output filename
fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2)); // Pretty print with indentation

console.log(`Merged data written to file: ${outputFilePath}`);