import { useState } from 'react'

const Title = ({ title }) => <h2>{title}</h2>

const Button = ({ name, clickHandler }) => {
  return (
    <>
      <button onClick={clickHandler}>{name}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    props.name === 'positive' ?
      <tr>
        <td>{props.name}</td>
        <td>{props.value}%</td>
      </tr> :

      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  if (!props.good && !props.neutral && !props.bad) {
    return (
      <div>
        <Title title='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <>
      <Title title='statistics' />
      <table>
        <tbody>
          <StatisticLine name='good' value={props.good} />
          <StatisticLine name='neutral' value={props.neutral} />
          <StatisticLine name='bad' value={props.bad} />
          <StatisticLine name='all' value={props.all} />
          <StatisticLine name='average' value={props.average} />
          <StatisticLine name='positive' value={props.positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGood = () => {
    setGood(good + 1)
  }

  const onNeutral = () => {
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  return (
    <>
      <Title title='give feedback' />
      <div>
        <Button name='good' clickHandler={onGood} />
        <Button name='neutral' clickHandler={onNeutral} />
        <Button name='bad' clickHandler={onBad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={(good - bad) / all} positive={good / all * 100} />
    </>
  )
}

export default App

