import React from 'react'

const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Total of {props.parts.reduce((acc, val) => {
        return acc + val.exercises
      }, 0)} exercises</p>
    </>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content key={course.id} parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
