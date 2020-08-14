import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const AddButton = styled.button`
  padding: 5px;
  margin: 5px;
  background: lightgreen;
  border-radius: 5px;
  border: solid lightgreen 2px;

  &:hover{
    background: white;
    border: solid lightgreen 2px;
  }
`
const CancelButton = styled.button`
  padding: 5px;
  margin: 5px;
  background: #ff5050;
  border-radius: 5px;
  border: solid #ff5050 2px;

  &:hover{
    background: white;
    border: solid #ff5050 2px;
  }
`

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <AddButton onClick={toggleVisible}>{props.buttonLabel}</AddButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisible}>cancel</CancelButton>
      </div>
    </div>
  )
})

Toggable.propTypes={
  buttonLabel: PropTypes.string.isRequired
}

Toggable.displayName='Toggable'

export default Toggable