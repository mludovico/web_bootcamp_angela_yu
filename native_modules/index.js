const fs = require('fs');

// fs.writeFileSync('test.txt', 'Hello, world!', (err) => {
    // if (err) throw err;   
// });

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});