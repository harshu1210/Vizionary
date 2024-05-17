const fs = require('fs');
const path = require('path');

// Read and parse the JSON file
fs.readFile('chartMenu.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const chartMenu = JSON.parse(data);

        chartMenu.forEach(item => {
            const directoryPath = item.href.split("/")[0];

            // Create the directory
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    console.error(`Error creating directory ${directoryPath}:`, err);
                    return;
                }

                console.log(`Directory ${directoryPath} created successfully.`);

                // Create files
                const filePaths = [
                    path.join(directoryPath, `${directoryPath}.html`),
                    path.join(directoryPath, `${directoryPath}.js`),
                    path.join(directoryPath, `${directoryPath}.css`)
                ];

                const fileContents = [
                    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${directoryPath}</title><link rel="stylesheet" type="text/css" href="${directoryPath}.css"><script src="${directoryPath}.js"></script></head><body></body></html>`,
                    '',
                    ''
                ];

                // Create the files
                filePaths.forEach((filePath, index) => {
                    fs.writeFile(filePath, fileContents[index], (err) => {
                        if (err) {
                            console.error(`Error creating file ${filePath}:`, err);
                        } else {
                            console.log(`File ${filePath} has been created.`);
                        }
                    });
                });
            });
        });

    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
