import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) =>{
  if (props.all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const average = props.points / props.all
  const positivePer = (props.good / props.all * 100) + " %"

  return (
    <table>
      <tbody>
        <StaticsLine text="Good" value={props.good} />
        <StaticsLine text="Neutral" value={props.neutral} />
        <StaticsLine text="Bad" value={props.bad} />
        <StaticsLine text="All" value={props.all} />
        <StaticsLine text="Average" value={average} />
        <StaticsLine text="Positive" value={positivePer}/>
      </tbody>
    </table>
  )
}

const StaticsLine = (props) =>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </tr>
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

      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} points={points}/>
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))