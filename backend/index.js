require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.write(`<p>Phonebook has info for ${persons.length} people<p>`)
      res.write(`<p>${new Date()}</p>`)
        .catch(error =>  next(error))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedperson => {
      res.json(savedperson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  Person.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(err => next(err))
})

//Exercise 7 & 8*

/*app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.post('/api/persons', (req, res) => {
  res.send()
})

morgan.token('type', (req, res) => {
  return JSON.stringify(req.body)
})*/

const UnknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(UnknownEndPoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
