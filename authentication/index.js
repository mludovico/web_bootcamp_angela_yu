import express from 'express'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'
import pg from 'pg'
import bcrypt from 'bcrypt'

const app = express()
const port = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))
const saltRounds = 10

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let client = new pg.Client({
    user: "auth_app",
    password: "password",
    database: "authentication",
    host: "localhost",
    port: 5432
})
client.connect()

app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs', {inner: fs.readFileSync(__dirname + '/views/home.ejs')})
})

app.get('/secrets', (req, res) => {
    res.render(__dirname + '/views/index.ejs', {inner: fs.readFileSync(__dirname + '/views/secrets.ejs')})
})

app.get('/login', (req, res) => {
    res.render(__dirname + '/views/index.ejs', {inner: fs.readFileSync(__dirname + '/views/login.ejs')})
})

app.get('/register', (req, res) => {
    res.render(__dirname + '/views/index.ejs', {inner: fs.readFileSync(__dirname + '/views/register.ejs')})
})

app.post('/login', (req, res) => {
    client.query(
        "SELECT * FROM credential WHERE email = $1 AND password = $2",
        [req.body.username, req.body.password],
        (err, result) => {
            if (err) {
                console.log(err)
                res.redirect(500, '/login')
            }
            if (result.rows.length > 0) {
                bcrypt.compare(req.body.password, result.rows[0].password, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.redirect(500, '/login')
                    }
                    if (result) {
                        res.redirect('/secrets')
                    } else {
                        res.redirect(401, '/login')
                    }
                })
            } else {
                res.redirect(401, '/login')
            }
        }
    )

})

app.post('/register', (req, res) => {
    let password = bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log("Error hashing password" + err)
        }
        client.query("INSERT INTO credential (email, password) VALUES ($1, $2)", [req.body.username, hash], (err, result) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/login')
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})