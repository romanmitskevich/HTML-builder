const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const pathOrigin = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');

fs.access(pathCopy, (data) => {
   if (data) fsPromises.mkdir(pathCopy);
});

async function createCopy(source, destination) {
   const allFiles = await fsPromises.readdir(source, { withFileTypes: true });

   await fsPromises.rm(destination, { force: true, recursive: true });
   await fsPromises.mkdir(destination, { recursive: true });

   for (let i = 0; i < allFiles.length; i++) {
      const pathOfCurrentFile = path.join(source, allFiles[i].name);
      const copyPathOfCurrentFile = path.join(destination, allFiles[i].name);

      if (allFiles[i].isDirectory()) {
         await fsPromises.mkdir(copyPathOfCurrentFile, { recursive: true });
         await createCopy(pathOfCurrentFile, copyPathOfCurrentFile);
      } else if (allFiles[i].isFile()) {
         await fsPromises.copyFile(pathOfCurrentFile, copyPathOfCurrentFile);
      }
   }
}

createCopy(pathOrigin, pathCopy);