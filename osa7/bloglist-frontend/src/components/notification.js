import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const message = useSelector(state => state.notif)

  return(
    <div className={message.class}>
      {message.message}
    </div>
  )
}
