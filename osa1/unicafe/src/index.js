import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [points, setPoints] = useState(0)

  const addGood = () =>{
    setGood(good + 1)
    setAll(all + 1)
    setPoints(points + 1)
  }
  const addNeutral = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const addBad = () =>{
    setBad(bad + 1)
    setAll(all + 1)
    setPoints(points - 1)
  }

  return(
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => addGood()} text="Good" />
      <Button handleClick={() => addNeutral()} text="Neutral" />
      <Button handleClick={() => addBad()} text="Bad" />

      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {points / all}</p>
      <p>Positive {good / all * 100}%</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))