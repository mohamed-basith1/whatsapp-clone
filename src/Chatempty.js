import React from 'react'
import './Chatempty.css'

const Chatempty = () => {
  return (
    <div className="chatempty">
      <div className="chatletter">
        <img alt="" src="logo.png" />
        <h3 style={{ letterSpacing: 2 }}>
          Select the chat to start the conversation
        </h3>
      </div>
    </div>
  )
}

export default Chatempty
