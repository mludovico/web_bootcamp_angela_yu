import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import axios from "axios";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let address = "";
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {address: address});
})

app.post("/cep", (req, res) => {
    const cep = req.body.cep
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            address = response.data.logradouro
            console.log(address)
            res.redirect("/")
        })
        .catch(error => {
            address = "CEP não encontrado"
            res.redirect("/")
        })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})