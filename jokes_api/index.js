import express from 'express'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
const jokes = JSON.parse(fs.readFileSync(__dirname + '/public/jokes.json', 'utf8'))

app.use(express.json())

app.get('/jokes', (req, res) => {
    const minRating = req.query.minRating || -Infinity
    const maxRating = req.query.maxRating || Infinity
    const filteredJokes = jokes.filter(joke => joke.rating >= minRating).filter(joke => joke.rating <= maxRating)
    console.log(filteredJokes.length)
    res.json(filteredJokes)
})

app.get('/jokes/random', (req, res) => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    res.json(randomJoke)
})

app.get('/jokes/:id', (req, res) => {
    const id = req.params.id
    const joke = jokes.find(joke => joke.id == id) || {error: 'Joke not found'}
    res.json(joke)
})

app.post('/jokes', (req, res) => {
    const jokeText = req.body.joke || ""
    const jokeRating = req.body.rating || 0
    if (!validateJoke(req.body)) {
        res.status(400).json({error: 'Invalid joke'})
        return
    }

    const newJoke = {
        id: jokes.length + 1,
        joke: jokeText,
        rating: jokeRating
    }

    jokes.push(newJoke)
    res.json(newJoke)

})

app.put('/jokes/:id', (req, res) => {
    if (!validateJoke(req.body) || !idExists(req.params.id)) {
        res.status(400).json({error: 'Invalid joke'})
        return
    }
    const id = req.params.id
    const joke = jokes.find(joke => joke.id == id)
    if (joke) {
        joke.joke = req.body.joke || joke.joke
        joke.rating = req.body.rating || joke.rating
        res.json(joke)
    } else {
        res.status(404).json({error: 'Joke not found'})
    }
})

app.patch('/jokes/:id', (req, res) => {
    if (!idExists(req.params.id)) {
        res.status(404).json({error: 'Joke not found'})
        return
    }
    const id = req.params.id
    const joke = jokes.find(joke => joke.id == id)
    for (let key in req.body) {
        if (key === 'joke' || key === 'rating') {
            joke[key] = req.body[key]
        }
    }
    res.json(joke)
})

app.delete('/jokes/:id', (req, res) => {
    if (idExists(req.params.id)) {
        const jokeIndex = jokes.findIndex(joke => joke.id == req.params.id)
        jokes.splice(jokeIndex, 1)
        res.json({message: `Joke ${req.params.id} deleted`})
    } else {
        res.status(404).json({error: 'Joke not found'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function validateJoke(joke) {
    return joke.joke && joke.rating >= 0 && joke.rating <= 5
}

function idExists(id) {
    return jokes.find(joke => joke.id == id)
}