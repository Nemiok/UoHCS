import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchCountriesField from './components/SearchCountries'
import CountriesList from './components/CountriesList'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()
    setFiltered(countries.filter(country => {
      const countryName = country.name.common.toLowerCase()
      const inputValue = e.target.value.toLowerCase()
      return countryName.includes(inputValue)
    }))
    console.log(filtered)
  }

  return (
    <div>
      <SearchCountriesField handleSearch={handleSearch} />
      {filtered.length > 1 && filtered.length <= 10 && <CountriesList countries={filtered} />}
      {filtered.length > 10 && 'Too many matches, specify another filter'}
      {filtered.length === 0 && <CountriesList countries={countries} />}
      {filtered.length === 1 && <CountryInfo capital={filtered[0].capital[0]} name={filtered[0].name.common} area={filtered[0].area} languages={filtered[0].languages} flag={filtered[0].flags.png} />}
    </div>
  )
}

export default App
