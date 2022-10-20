import React from "react";

const AddNewPeopleForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleNameInput} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.handlePhoneInput} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNewPeopleForm
