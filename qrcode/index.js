import fs from 'fs';
import qr from 'qr-image';
import inquirer from 'inquirer';

inquirer.prompt([
    {name: "content", message: 'Enter the text to be converted to QR code'}
]).then(answers => {
    fs.writeFileSync('input.txt', answers.content, (err) => {
        if (err) throw err;   
 });
    const qr_svg = qr.image(answers.content, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qrcode.png'));
    console.log('QR code created');
}).catch(err => {
    console.log(err);
});