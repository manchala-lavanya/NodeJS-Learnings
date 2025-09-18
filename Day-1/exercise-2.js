import fs from 'fs/promises';

async function processFile() {
    try {
        const data = await fs.readFile('sample.js', 'utf8');
        console.log(data.split('').filter((u)=> u != 'u').join(''));

        console.log("Successfully wrote filtered content");
    } catch (error) {
        console.error("Error processing file:", error);
    }
}

processFile();
