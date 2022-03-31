import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Sidebar.css'
import Sidebarchat from './Sidebarchat'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CircularProgress from '@mui/material/CircularProgress'
import { Link, useHistory } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Sidebar = () => {
  const [user, setUser] = useState([])
  const [userdetails, setUserdetails] = useState([])
  const [active, setActive] = useState(false)
  const history = useHistory()

  const ITEM_HEIGHT = 38
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const getall = async () => {
      const response = await axios.get('/user/getall')
      setActive(true)
      const alluser = response.data

      const useremail = localStorage.getItem('useremail')
      const currentuser = await axios.get(`/user/getone/${useremail}`)
      setUserdetails(currentuser.data)
      const filtered = alluser.filter((user) => user.email !== useremail)

      setUser(filtered)
    }
    getall()
  }, [])

  //serach concept

  const logout = () => {
    setAnchorEl(null)
    localStorage.clear()
    history.push('/')
    window.location.reload()
  }
  const handleClose = () => {
    console.log('profile clicked')
    setAnchorEl(null)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* <div className="option">option</div> */}
        <div className="sidebar-header-content">
          {active ? (
            userdetails.map((pic) => (
              <Avatar
                key={pic._id}
                alt=""
                src={`${pic.profile}?${pic.profile}:""`}
                sx={{ width: 40, height: 40 }}
              />
            ))
          ) : (
            <Avatar alt="" src="" />
          )}

          <div className="sidebar-header-content-symble">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '10ch',
                  top: 62,
                  left: 44,
                },
              }}
            >
              <MenuItem onClick={handleClose}>profile</MenuItem>
              <MenuItem onClick={logout}>logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="sidebar-search" style={{ padding: 10 }}>
        <form>
          <TextField
            fullWidth
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ fontSize: 30, paddingBottom: 2 }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </form>
      </div>
      <div className="sidebarchat-okok">
        {active ? (
          user.map((user) => (
            <Link to={`/${user._id}`} key={user._id}>
              <Sidebarchat users={user} />
            </Link>
          ))
        ) : (
          <CircularProgress className="loading" />
        )}
      </div>
    </div>
  )
}

export default Sidebar
