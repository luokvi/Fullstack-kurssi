import React, {useState}from 'react';
import ReactDOM from 'react-dom';

const App = (props) =>{
  

  const [selected, setSelected] = useState(0)

  const nextAnecdote = () =>{
    const index = Math.floor((Math.random() * 5));
    setSelected(index)
    
  }

  return(
    <div>
      <h1>anecdotes</h1>
      <p>{props.list[selected]}</p>
      <button onClick={() => nextAnecdote()}>next anecdote</button>
    </div>

  )
}

const anecdotes = [
  "Brooks Law: 'Adding manpower to a late software project makes it later!'",
  "The best way to get a project done faster is to start sooner",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Even the best planning is not so omniscient as to get it right the first time.",
  "How does a project get to be a year late?... One day at a time.",
  "The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging",
  "Plan to throw one (implementation) away; you will, anyhow."
]

ReactDOM.render(<App list={anecdotes}/>, document.getElementById('root'))