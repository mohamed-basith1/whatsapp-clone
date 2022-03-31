import React, { useState } from 'react'
import Signup from './Signup'
import './Signinscreen.css'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import axios from './axios'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

import LockOpenIcon from '@mui/icons-material/LockOpen'

const SigninScreen = () => {
  const [state, setstate] = useState(true)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required('email is required').email(),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'password must ne 8 characters'),
    }),
    onSubmit: (e) => {
      const check = async () => {
        try {
          const response = await axios.post('/user/signin', e)
          console.log(response.data)
          await localStorage.setItem('token', response.data)
          await localStorage.setItem('useremail', e.email)
          window.location.reload()
        } catch (error) {
          alert(error.response.data)
        }
      }
      check()
    },
  })
  return (
    <div className="Signinscreen">
      {state ? (
        <div className="signin">
          <h1>Sign in</h1>

          <form
            onSubmit={formik.handleSubmit}
            className="textfield"
            autoComplete="off"
          >
            <TextField
              fullWidth
              name="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              style={{ marginTop: 40 }}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <p style={{ color: 'red' }}> {formik.errors.email}</p>
            ) : null}
            <TextField
              fullWidth
              name="password"
              id="standard-basic"
              type="password"
              label="Password"
              style={{ marginTop: 40 }}
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <p style={{ color: 'red' }}> {formik.errors.password}</p>
            ) : null}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'rgb(0,150,136)' }}
            >
              Sign in
            </Button>
          </form>
          <div className="spanbox">
            Don't have an account?
            <span
              onClick={() => setstate(false)}
              style={{
                //rgb(24,113,205)
                color: 'rgb(24,113,205)',
                cursor: 'pointer',
                marginLeft: '10px',
                fontWeight: '600',
                fontSize: '20px',
              }}
            >
              signup
            </span>{' '}
          </div>
        </div>
      ) : (
        <Signup />
      )}
    </div>
  )
}

export default SigninScreen
