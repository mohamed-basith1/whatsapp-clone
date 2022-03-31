import React, { useRef } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'

import * as yup from 'yup'
import axios from './axios'
import PersonIcon from '@mui/icons-material/Person'

const Signup = () => {
  const profile = useRef(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      profile: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('name must be enter')
        .min(5, 'minimum 5 character')
        .max(15, 'maximum  15 character only  '),
      profile: yup.string().required('profile must be upload'),
      email: yup.string().required('email is required').email(),
      password: yup
        .string()
        .required('password is required')
        .min(8, 'password must be 8 characters'),
    }),
    onSubmit: (values) => {
      console.log(values)
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('profile', values.profile)

      // // Display the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      axios
        .post('/user/signup', formData)
        .then((res) => console.log(res.data))
        .then(() => window.location.reload())
    },
  })
  const profileclicked = () => {
    profile.current.click()
  }

  return (
    <div className="signup">
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        className="textfield"
        autoComplete="off"
      >
        <Button onClick={profileclicked}>
          <PersonIcon
            style={{ fontSize: 100, cursor: 'pointer', color: 'black' }}
          />
          <input
            ref={profile}
            type="file"
            name="profile"
            style={{ display: 'none' }}
            onChange={(event) =>
              formik.setFieldValue('profile', event.target.files[0])
            }
          />
        </Button>
        {formik.errors.name ? (
          <p style={{ color: 'red' }}> {formik.errors.profile}</p>
        ) : null}

        <TextField
          fullWidth
          type="text"
          name="name"
          id="standard-basic"
          label="Name"
          variant="standard"
          style={{ marginTop: 5 }}
          //formik method
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name ? (
          <p style={{ color: 'red' }}> {formik.errors.name}</p>
        ) : null}
        <TextField
          fullWidth
          name="email"
          style={{ marginTop: 5 }}
          id="standard-basic"
          label="Email"
          variant="standard"
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
          style={{ marginTop: 5 }}
          label="Password"
          type="password"
          variant="standard"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="new-password"
        />
        {formik.errors.password ? (
          <p style={{ color: 'red' }}> {formik.errors.password}</p>
        ) : null}
        <Button
          fullWidth
          type="submit"
          style={{ backgroundColor: 'rgb(0,150,136)', marginTop: 3 }}
          variant="contained"
        >
          Sign up
        </Button>
      </form>
    </div>
  )
}

export default Signup
