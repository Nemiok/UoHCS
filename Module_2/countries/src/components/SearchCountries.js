import React from 'react'

const SearchCountriesField = (props) => {
  return (
    <div>find countries: <input onChange={props.handleSearch} /></div>
  )
}

export default SearchCountriesField
