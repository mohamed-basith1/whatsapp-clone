import React from 'react'
import './Sidebarchat.css'
import Avatar from '@mui/material/Avatar'

const Sidebarchat = ({ users }) => {
  return (
    <div className="sidebarchat" key={users._id}>
      <div className="chatlist">
        <Avatar alt="" src={users.profile} sx={{ width: 35, height: 35 }} />
        <h3>{users.name}</h3>
      </div>
    </div>
  )
}

export default Sidebarchat
