import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SigninScreen from './SigninScreen'
import Sidebar from './Sidebar'
import Chatempty from './Chatempty'
import Chat from './Chat'
import Pusher from 'pusher-js'

const App = () => {
  const [user, setUser] = useState(null)
  const [pushmsg, setPushmsg] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')

    setUser(token)
    const pusher = new Pusher('b7aabb50cddff4693018', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (data) => {
      console.log(data)
      setPushmsg(data.message)
    })
  }, [])

  return (
    <div className="App">
      <div className="headerbg"> </div>
      {!user ? (
        <SigninScreen />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/:id">
                <Chat pusher={pushmsg} />
              </Route>
              <Route path="/">
                <Chatempty />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
