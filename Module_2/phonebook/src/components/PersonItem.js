import React from "react"

const PersonItem = (props) => {
  return (
    <li>{props.name} {props.number} <button onClick={() => { props.handlePersonDelete(props.id, props.name) }}>delete</button></li>
  )
}

export default PersonItem
