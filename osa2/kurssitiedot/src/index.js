import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) =>{
  return(
    <div>
      <Header key={course.id} course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack Application Development",
    parts: [ 
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7
      },
      {
        id: 3,
        name: "State of component",
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Course course={course}/>
      <Total parts={course.parts} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
