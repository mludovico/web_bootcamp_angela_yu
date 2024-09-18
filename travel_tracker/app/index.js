import express from 'express';
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const port = 9000;
const __dirname = dirname(fileURLToPath(import.meta.url))

const apiUrl = 'http://localhost:3000'

let selectedUser = 1

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {

    let usersPromise = await fetch(apiUrl + '/person')
    let users = await usersPromise.json() || []
    let countriesPromise = await fetch(apiUrl + '/person/' + selectedUser + '/travel')
    let countries = await countriesPromise.json() || []
    let countryCodes = countries.map(country => country.destination)
    res.render(__dirname + '/views/index.ejs', {
        users: users,
        countries: countryCodes,
        color: users.filter(user => user.id == selectedUser)[0].color,
        total: countries.length
    })
})

app.post('/user', async (req, res) => {
    if (req.body.user) {
        selectedUser = req.body.user
        res.redirect('/')
    } else {
        res.render(__dirname + '/views/user.ejs', {})
    }
})

app.post('/person', async (req, res) => {
    await fetch(apiUrl + '/person', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    res.redirect('/')
})

app.post('/travel', async (req, res) => {
    console.log(req.body)
    await fetch(apiUrl + '/person/' + selectedUser + '/travel', {
        method: 'POST',
        body: JSON.stringify({destination: req.body.country}),
        headers: {'Content-Type': 'application/json'}
    })
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})