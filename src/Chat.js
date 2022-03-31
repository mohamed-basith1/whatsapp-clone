import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import Avatar from '@mui/material/Avatar'
import axios from './axios'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'

const Chat = ({ pusher }) => {
  const params = useParams()
  const [input, setInput] = useState('')
  const [myid, setMyid] = useState('')
  const [channeldetails, setChanneldeatils] = useState([])
  const [message, setMessage] = useState([])
  const [open, setOpen] = useState(false)
  const inputFile = useRef()
  const scrollref = useRef()

  //channel changed to get the message from database
  useEffect(() => {
    const getmessage = async () => {
      //get current user id
      const useremail = localStorage.getItem('useremail')
      const currentuser2 = await axios.get(`/user/getone1/${useremail}`)
      const id = currentuser2.data._id
      setMyid(id)

      //get user message from db using current user id  and channael id
      const response = await axios.get(`/message/${params.id + id}`)
      setMessage(response.data)

      scrollref.current?.scrollIntoView({ behavior: 'smooth' })

      //get the channel id for the chat header components
      const getchannel = await axios.get(`/user/getoneid/${params.id}`)
      setChanneldeatils(getchannel.data)
    }
    getmessage()
  }, [params, pusher])

  //message submit function
  const inputclicked = (e) => {
    e.preventDefault()
    const time = new Date()
    const currenttime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    const messagedata = {
      conversation: [`${myid + params.id}`, `${params.id + myid}`],
      senderid: myid,
      text: input,
      time: currenttime,
    }

    axios
      .post('/message/', messagedata)
      .then(() => console.log('succesfully message submitted'))
    setInput('')
  }

  //message image submit
  const imagesubmit = (e) => {
    const time = new Date()

    const currenttime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    const conversation1 = [`${myid + params.id}`]
    const conversation2 = [`${params.id + myid}`]
    const senderid = myid
    const time1 = currenttime
    const image = e.target.files[0]
    const formData = new FormData()

    formData.append('conversation1', conversation1)
    formData.append('conversation2', conversation2)
    formData.append('senderid', senderid)
    formData.append('time', time1)
    formData.append('image', image)

    const imagesend = async () => {
      await axios
        .post('/message/image', formData)
        .then(console.log('succesfuly image submited'))
    }
    imagesend()
    console.log('image upload')
  }

  const toggle = () => {
    setOpen(!open)
  }

  const attactclicked = () => {
    inputFile.current.click()
  }

  return (
    <div className="chat">
      <div className="chatheader" onClick={toggle}>
        <Drawer
          containerStyle={{ height: 'calc(100% - 64px)' }}
          anchor={'top'}
          open={open}
          onClick={toggle}
        >
          basith
        </Drawer>

        {channeldetails.map((e) => (
          <>
            <Avatar
              className="chatheaderavatar"
              alt=""
              src={e.profile}
              sx={{ width: 40, height: 40 }}
            />
            <p>{e.name}</p>
          </>
        ))}
      </div>
      <div className="chatbody">
        {message.map((msg) =>
          msg.text ? (
            <div
              ref={scrollref}
              key={msg._id}
              className={`${
                msg.senderid === myid ? 'messageother' : 'message'
              }`}
            >
              {msg.text}
              <span style={{ color: 'gray', fontSize: 10, marginLeft: 5 }}>
                {msg.time}
              </span>
            </div>
          ) : (
            <div
              key={msg._id}
              className={`${
                msg.senderid === myid ? 'message' : 'messageother'
              }`}
            >
              <img className="images" alt="" src={msg.image} />
              <div>
                <span style={{ color: 'gray', fontSize: 10, marginLeft: 5 }}>
                  {msg.time}
                </span>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="chatfooter">
        <IconButton onClick={attactclicked}>
          <AttachFileIcon />
          <input
            type="file"
            ref={inputFile}
            name="image"
            onChange={(e) => imagesubmit(e)}
            style={{ display: 'none' }}
          />
        </IconButton>
        <form onSubmit={inputclicked}>
          <input
            value={input}
            placeholder="Enter the Message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
