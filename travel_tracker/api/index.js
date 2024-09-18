import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
const db = new pg.Client({
    user: 'travel_tracker_api',
    host: 'localhost',
    database: 'travel_tracker',
    password: '123456',
    port: 5432,
})

db.connect()
app.use(express.json())

app.get('/person', (req, res) => {
    db.query('SELECT * FROM person', (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
})

app.post('/person', (req, res) => {
    db.query('INSERT INTO person (name, color) VALUES ($1, $2) returning id', [req.body.name, req.body.color], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Person added with ID: ${results.rows[0].id}`)
    })
})

app.put('/person/:id', (req, res) => {
    db.query('UPDATE person SET name = $1, color = $2 WHERE id = $3', [req.body.name, req.body.color, req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        res.json({id: req.params.id, name: req.body.name, color: req.body.color})
    })
})

app.delete('/person/:id', (req, res) => {
    db.query('DELETE FROM person WHERE id = $1 RETURNING id', [req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length === 0) {
            res.status(404).send('Person not found')
        } else {
            res.json({id: results.rows[0].id})
        }
    })
})

app.get('/person/:id/travel', (req, res) => {
    db.query('SELECT * FROM travel WHERE person_id = $1', [req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows)
    })
})

app.post('/person/:id/travel', (req, res) => {
    db.query('INSERT INTO travel (person_id, destination) VALUES ($1, $2) RETURNING id', [req.params.id, req.body.destination], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Travel added with ID: ${results.rows[0].id}`)
    })
})

app.delete('/person/:id/travel/:travel_id', (req, res) => {
    db.query('DELETE FROM travel WHERE id = $1 AND person_id = $2', [req.params.travel_id, req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        res.json({id: req.params.travel_id})
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})