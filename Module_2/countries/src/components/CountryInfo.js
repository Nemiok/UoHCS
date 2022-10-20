import React from 'react'

const CountryInfo = (props) => {
  console.log(Object.values(props.languages));
  return (
    <div>
      <h1>{props.name}</h1>
      <div>capital {props.capital}</div>
      <div>area {props.area}</div>

      <p>languages:</p>
      <ul>
        {Object.values(props.languages).map((lang, index) => <li key={new Date().getTime() + index}>{lang}</li>)}
      </ul>

      <div>
        <img src={props.flag} alt='flag' />
      </div>
    </div>
  )
}

export default CountryInfo
