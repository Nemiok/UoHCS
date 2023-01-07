import React from "react"
import './Notification.css'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  else if (message.toLowerCase().includes('removed') || message.toLowerCase().includes('already') || message.toLowerCase().includes('wrong') || message.toLowerCase().includes('failed')) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

export default Notification
