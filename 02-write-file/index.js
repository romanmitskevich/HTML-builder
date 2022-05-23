const fs = require('fs');
const path = require('path');
const readLine = require('readline').createInterface({
   input: process.stdin,
   outpur: process.stdout
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'newText.txt'));

fs.writeFile(path.join(__dirname, 'newText.txt'), '', function (error) {
   if (error) throw error;
   console.log('Please, write some text:');
});

readLine.on('line', function (input) {
   if (input.trim() === 'exit') {
      readLine.close();
   }

   writeStream.write(`${input}\n`, error => {
      if (error) throw error;
   });

});

process.on('exit', code => {
   code === 0 ? console.log('\nBye-bye!') : console.log(`Got error with code: ${code}`);
});

readLine.on('close', () => process.exit());

process.on('SIGINT', () => process.exit());