import React from 'react'

const Course = ({courses}) =>{
    return(
      
        courses.map(course =>
          <div key={course.id}>
          <Header key={course.id} course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
          </div>
        )
    )
  }
  
  const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Content = (props) => {
    return(
      <div>
        {props.parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    
    const total = parts.reduce( (total, part) => total + part.exercises, parts[0].exercises)
  
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }

  export default Course