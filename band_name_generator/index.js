import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(req)
    next()
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.ejs")
})

app.get("/about", (req, res) => {
    res.sendStatus(201)
})

app.post("/submit", (req, res) => {
    console.log(req.body.pet_name)
    res.send(`<h1>Success!</h1><h2>Your band name is:</h2><p>${req.body.street_name}${req.body.pet_name}🤘</p>`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
