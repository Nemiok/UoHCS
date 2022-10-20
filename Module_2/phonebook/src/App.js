import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import AddNewPeopleForm from './components/AddNewPeopleForm'
import Persons from './components/Persons'
import communication from './services/communication'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    communication
      .getNumbers()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: new Date().getTime()
    }

    if (persons.find(person => person.name === newName)) {
      new Promise(resolve => {
        setMessage(`${newName} is already added to phonebook`)
        resolve()
      })
        .then(res => { setTimeout(() => { setMessage(null) }, 5000) })
      return
    }

    communication.addPerson(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    new Promise(resolve => {
      setMessage(`Added ${newName}`)
      resolve()
    })
      .then(res => { setTimeout(() => { setMessage(null) }, 5000) })
  }

  const handleNameInput = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handlePhoneInput = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  const handleSearchInput = (e) => {
    e.preventDefault()
    communication.getNumbers().then(response => {
      if (e.target.value.length === 0) {
        setPersons(response)
      }
    })

    const filteredPersons = persons.filter(person => person.name.toLowerCase() === e.target.value.toLowerCase())
    if (filteredPersons.length > 0) {
      setPersons(filteredPersons)
    }
  }

  const handlePersonDelete = (id, name) => {
    communication.deletePerson(id)
      .then(response => {
        return communication.getNumbers()
      })
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        setMessage(
          `Information of ${name} has already beem removed from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <SearchFilter handleSearchInput={handleSearchInput} />
      <h3>Add a new</h3>
      <AddNewPeopleForm handleSubmit={handleSubmit} handleNameInput={handleNameInput} handlePhoneInput={handlePhoneInput} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App
