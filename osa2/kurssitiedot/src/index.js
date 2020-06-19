import React from 'react';
import ReactDOM from 'react-dom';
import Course from './Course'


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
