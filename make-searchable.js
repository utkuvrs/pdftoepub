const { exec } = require('child_process');
const path = require('path');

// Directory containing scanned PDFs
const inputDir = './scanned_pdfs';
// Output directory for searchable PDFs
const outputDir = './searchable_pdfs';

// Ensure input and output folders exist
const fs = require('fs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(inputDir)) {
    console.error(`Input directory "${inputDir}" does not exist.`);
    process.exit(1);
}

// Function to run OCR and make PDF searchable
function makeSearchable(inputPath, outputPath) {
    const command = `ocrmypdf "${inputPath}" "${outputPath}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error processing ${inputPath}:`, error.message);
            return;
        }
        console.log(`Processed: ${inputPath} -> ${outputPath}`);
    });
}

// Process each PDF in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Failed to read input directory:', err.message);
        process.exit(1);
    }

    files.forEach((file) => {
        if (path.extname(file).toLowerCase() === '.pdf') {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);
            makeSearchable(inputPath, outputPath);
        }
    });
});
