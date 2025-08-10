require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Get directories from .env
const sourceDir = process.env.SOURCE_DIR;
const destDir = process.env.DEST_DIR;

if (!sourceDir || !destDir) {
    console.error('Please set SOURCE_DIR and DEST_DIR in your .env file.');
    process.exit(1);
}

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function copyFiles(src, dest) {
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.lstatSync(srcPath).isDirectory()) {
            // Recursively copy directories
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyFiles(srcPath, destPath);
        } else {
            // Copy file
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} -> ${destPath}`);
        }
    });
}

try {
    copyFiles(sourceDir, destDir);
    console.log('✅ All files copied successfully.');
} catch (err) {
    console.error('❌ Error copying files:', err);
}
