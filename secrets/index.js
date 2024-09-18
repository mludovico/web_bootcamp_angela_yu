import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new express();
const port = 3000;
const secrets = [
    "I am a secret",
    "I am also",
    "I am not",
]
const password = "ILoveFlutter"

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.ejs")
})

app.post("/check", (req, res) => {
    if (req.body.password === password) {
        let htmlSecrets = ""
        for (let secret of secrets) {
            htmlSecrets += `<li>${secret}</li>`
        }
        res.send(`<ul>Secrets:${htmlSecrets}</ul>`)
    } else {
        res.sendFile(__dirname + "/public/index.ejs")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})