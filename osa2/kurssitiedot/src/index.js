import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({courses}) =>{
  return(
    
      courses.map(course =>
        <div>
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

const App = () => {
  const courses = [

    {id: 1,
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
    },
    {
    id: 2,
    name: "Node.js",
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
      ]
    }
  
  ]


  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Course courses={courses}/>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))
