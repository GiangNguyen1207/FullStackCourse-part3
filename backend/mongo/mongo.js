const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-ynncc.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema ({
  name: String,
  number: String,
})

const Person = mongoose.model('Persons', personSchema)

if(process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(person.number + ' ' + person.name)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  const person = new Person ({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}






