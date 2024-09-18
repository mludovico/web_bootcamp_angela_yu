import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let name

function getTitle() {
    if (name) {
        return `There are ${name.length} letters in your name`;
    } else {
        return "Enter your name below";
    }
}

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render(__dirname + "/views/index.ejs", {title: getTitle()});
})

app.post('/submit', (req, res) => {
    console.log(
    )
    let firstName = req.body.firstName || '';
    let lastName = req.body.lastName || '';

    name =
        firstName.replaceAll(" ", "") + lastName.replaceAll(" ", "");
    res.redirect('/')
})

app.listen(
    port,
    () => console.log(`Server is running on http://localhost:${port}`)
)