import express from 'express'
import pg from 'pg'

const app = express()
const PORT = 3000
const db = new pg.Client({
    user: process.env.DB_USER || 'api_access',
    password: process.env.DB_PASSWORD || '123456',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'world'
})
db.connect()

app.use(express.json())

app.get('/capitals', (req, res) => {
    if (req.query.name) {
        const name = req.query.name
        db.query("SELECT * FROM capitals WHERE country ILIKE $1 OR capital ILIKE $1", [`%${name}%`], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal server error'})
            }
            res.json(result.rows)
        })
    } else {
        db.query('SELECT * FROM capitals', (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal server error'})
            }
            res.json(result.rows)
        })
    }
})

app.get('/capitals/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM capitals WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Internal server error'})
        }
        res.json(result.rows)
    })
})

app.get('/flags', (req, res) => {
    if (req.query.name) {
        const name = req.query.name
        db.query("SELECT * FROM flags WHERE name ILIKE $1", [`%${name}%`], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal server error'})
            }
            res.json(result.rows)
        })
    } else {
        db.query('SELECT * FROM flags', (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({message: 'Internal server error'})
            }
            res.json(result.rows)
        })
    }
})

app.get("/flags/:id", (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM flags WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Internal server error'})
        }
        res.json(result.rows)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
