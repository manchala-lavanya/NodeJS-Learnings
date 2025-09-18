import os from "os";
import fs from "fs/promises";
import fsnoPromise from "fs";
// const fs = require('fs').promises;
async function readFileWithPromise() {
    try {
        const data = await fs.readFile('sample.js', 'utf8');
        console.log("File content with promise:", data);
        await fs.writeFile('output.txt', data);
        console.log("File written successfully with promise");
        //another async
    } catch (error) {
        console.log(error);
    }
}
readFileWithPromise()


function readFile1(file) {
    fsnoPromise.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        fsnoPromise.writeFile('output.txt', data, (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("File written successfully");
            }
        });
        console.log("File content:", data);
    });
}
// readFile1('exercise.js');
// console.log("Platform:", os.platform());
// console.log("CPU Architecture:", os.arch());