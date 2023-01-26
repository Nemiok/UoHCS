import React from 'react'
import './LoginForm.css'

export const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLoginSubmit}>
      <label className='inputBlock'>Username:
        <input id='input-username' value={props.username} onChange={({ target }) => props.handleUsername(target.value)} type='text'></input>
      </label>
      <label className='inputBlock'>Password:
        <input id='input-password' value={props.password} onChange={({ target }) => props.handlePassword(target.value)} type='password'></input>
      </label>
      <button type='submit'>Log in</button>
    </form>
  )
}

export default LoginForm