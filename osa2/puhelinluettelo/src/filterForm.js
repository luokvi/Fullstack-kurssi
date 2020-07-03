import React from 'react'

const filter = (props) =>{
    return (
        <form>
          <div>
              filter shown names: <input value={props.newFilter} onChange={props.handleFilterInput} />
          </div>
        </form>
    )
}

export default filter