import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
const db = new pg.Client({
    user: process.env.DB_USER || 'note_keeper_api',
    password: process.env.DB_PASSWORD || '123456',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'note_keeper'
})
db.connect()

app.use(express.json());

app.use(cors());

app.use((req,res,next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path, req.time);
    next();
});

app.get('/notes', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    db.query('SELECT * FROM notes ORDER BY id', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json(result.rows);
    });
})

app.post('/notes', async(req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const note = req.body;
    db.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [note.title, note.content], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json({ message: 'Note created', note: result.rows[0]});
    });
});

app.patch('/notes/:id', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const note = req.body;
    db.query('UPDATE notes SET title = $1, content = $2, done = $3 WHERE id = $4 RETURNING *', [note.title, note.content, note.done, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json({ message: `Note with id ${req.params.id} updated`, note: result.rows[0]});
    });
});

app.delete('/notes/:id', async (req, res) => {
    console.log(req.params.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    db.query('DELETE FROM notes WHERE id = $1 RETURNING id', [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json({ message: `Note with id ${req.params.id} deleted`});});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})