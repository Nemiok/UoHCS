import React, { useState } from 'react'
import CountryInfo from './CountryInfo'

const CountryInfoButton = (props) => {
  const [isInfoShown, setIsInfoShown] = useState(false)
  const showCountryInfo = (e) => {
    e.preventDefault()
    setIsInfoShown(!isInfoShown)
  }
  return (
    <>
      <button onClick={showCountryInfo}>{isInfoShown ? 'hide' : 'show'}</button>
      {isInfoShown && <CountryInfo capital={props.country.capital[0]} name={props.country.name.common} area={props.country.area} languages={props.country.languages} flag={props.country.flags.png} />}
    </>
  )
}

const CountryItem = (props) => {
  if (props.fewItems) {
    return (
      <li>
        {props.name}
        <CountryInfoButton country={props.country} />
      </li>
    )
  }

  return (
    <li>{props.name}</li>
  )
}

export default CountryItem
