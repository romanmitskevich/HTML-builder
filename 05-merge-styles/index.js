const fsPromises = require('fs/promises');
const path = require('path');

const resultFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
const sourcePath = path.join(__dirname, 'styles');

let arrayWithStyles = [];

(async function () {
   const allFilesNames = await fsPromises.readdir(sourcePath, { withFileTypes: true });

   for (let i = 0; i < allFilesNames.length; i++) {
      const pathOfCurrentFile = path.join(sourcePath, allFilesNames[i].name);

      if (path.extname(pathOfCurrentFile) === '.css') {
         const allStyles = await fsPromises.readFile(pathOfCurrentFile, 'utf8');
         arrayWithStyles.push(`${allStyles}\n`);
      }
   }

   await fsPromises.writeFile(resultFilePath, arrayWithStyles);
})();