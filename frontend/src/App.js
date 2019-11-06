import React, { useEffect, useState } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./service/persons";
import Success from "./components/Success";
import Error from "./components/Error"

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)

    useEffect(()=> {
        personService
          .getAll()
          .then(response => {setPersons(response.data)})
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const checkName=persons.map(p => p.name.indexOf(newName) === -1)
        const newPerson={
            name:newName,
            number:newNumber,
            id:persons.length+1,
        }

        if(checkName.indexOf(false) === -1) {
            personService
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNumber('')
                    setSuccess(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccess(null)
                      }, 5000)
            })
                .catch(error => {
                    const err = JSON.stringify(error.response.data.error)
                    setError(err)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                })
        } else if (newName === '') {
            setError('Name field is missing')
            setTimeout(() => {
                setError(null)
            }, 5000)
        } else {
            if (window.confirm(`${newName} is already added to phonebook,
            replace the old number with a new one?`)) {
                const index=checkName.indexOf(false)
                const changedPerson = {...persons[index], number: newNumber }
                personService
                    .update(persons[index].id, changedPerson)
                    .then(response => {
                        setPersons((persons), window.location.reload()) 
                    })
                    .catch(error => {
                        setError(`Information of ${newName} has already been removed from the server`)
                        setTimeout(() => {
                            setError(null)
                        }, 5000)
                    })
            } else {
                window.open("exit.html", "Thanks for Visiting!")
            }
        }
    } 

    const deletePerson = (id, name) => {
        if (window.confirm(`delete ${name} ?`)) { 
            personService.del(id)
            .then(response => {
                const del = persons.filter(p => p.id !== id)
                setPersons(del)               
        })
        } else {
            window.open("exit.html", "Thanks for Visiting!");
        } 
    }

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberInput = (event) => {
        setNumber(event.target.value)
    }

    const handlerFilterInput = (event) => {
        setFilter(event.target.value) 
    }

    const filteredContacts = persons.filter(contact=>
        contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  
    return (
    <div>
        <h2>Phonebook</h2>
            <Success message={success}/>
            <Error message={error}/>
            <Filter 
                value={filter}
                handleFilterChange={handlerFilterInput}
            />    
        <h3>add a new</h3>
            <PersonForm 
                submit={addPerson}
                nameValue={newName}
                handleNameChange={handleNameInput}
                phoneNumberValue={newNumber}
                handlePhoneNumberChange={handlePhoneNumberInput}
            />
    
        <h3>Numbers</h3>
            <Persons 
                persons={filteredContacts}
                deletePerson={deletePerson}
            />
    </div>
    )
}

export default App