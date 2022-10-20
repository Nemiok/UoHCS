import React from "react";
import PersonItem from "./PersonItem";

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map(person => <PersonItem key={person.id} id={person.id} name={person.name} number={person.number} handlePersonDelete={props.handlePersonDelete} />)}
    </ul>
  )
}

export default Persons
