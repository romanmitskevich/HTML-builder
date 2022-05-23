const fs = require('fs/promises');
const path = require('path');

(async function () {
   const allFilesArray = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });

   for (let file of allFilesArray) {
      if (file.isFile()) {
         const fileName = file.name.slice(0, file.name.indexOf('.'));
         const filePath = path.join(__dirname, 'secret-folder', file.name);
         const fileType = path.extname(filePath).slice(1);
         const fileStats = await fs.stat(filePath);

         console.log(`${fileName} - ${fileType} - ${fileStats.size / 1024}kb`);
      }
   }
})();