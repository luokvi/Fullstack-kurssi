import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const message = useSelector(state => state)

  console.log('!!message:', message)
  return(
    <div className={message.class}>
      {message.message}
    </div>
  )
}
