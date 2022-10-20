import React from 'react'
import CountryItem from './CountryItem'

const CountriesList = (props) => {

  if (props.countries.length > 1 && props.countries.length <= 10) {
    return (
      <ul>
        {props.countries.map(country => <CountryItem country={country} fewItems={true} key={Math.random() * 1000000} name={country.name.common} />)}
      </ul>
    )
  }

  return (
    <ul>
      {props.countries.map(country => <CountryItem country={country} key={Math.random() * 1000000} name={country.name.common} />)}
    </ul>
  )
}

export default CountriesList
