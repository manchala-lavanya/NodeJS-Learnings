import fs from 'fs';

fs.readdir('./', (err, files) => {
   if (err) {
      console.error('Error reading directory:', err);
        return;
    }
   console.log('Files in current directory:', files);
 });

async function listFiles() {
    try {
        const files = await fs.promises.readdir('./');
        console.log('Files in current directory (async/await):', files);
    } catch (err) {
        console.error('Error reading directory:', err);
    }   
}


listFiles();
