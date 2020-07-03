import React from 'react'

const nameForm = (props) =>{

    return (
        <form onSubmit={props.addName}>
            <div>
            name: <input value={props.newName} onChange={props.handleNameInput}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumInput} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>

        )
}

export default nameForm