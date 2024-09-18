import express from 'express';
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new express();
const port = 3000;
const bowl = [
    "Apples",
    "Oranges",
    "pears",
]

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    let day = new Date().getDay();
    let greeting = "Hey! It's a weekday, it's time to work harder than ever!";
    if (day === 0 || day === 6) {
        greeting = "Hey! It's a weekend, it's time to have fun!"
    }
    res.render(__dirname + "/views/index.ejs", {greetingMessage: greeting})
})

app.get("/fruits", (req, res) => {
    res.render(
        __dirname + "/views/index.ejs",
        {
            fruits: bowl,
            bottomLine: "<em>These are the fruits we have in our bowl</em>",
            title: "Fruits EJS",
            currentSeconds: new Date().getSeconds()
        },
    )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})