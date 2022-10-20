import React from "react";

const Note = (props) => {
  console.log(props)
  return (
    <li>{props.content}</li>
  )
}

export default Note