import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signup } from '../services/Auth.service'

export default function BasicStack() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    loading: false,
  })

  const handleChange = (prop) => (event) => {
    if (errors) setErrors('')
    setValues({ ...values, [prop]: event.target.value })
  }

  const initsignup = async (data) => {
    setLoading(true)
    const res = await signup(data)
    if (res.statusCode === 200) {
      const { jwt, user } = res
      window.localStorage.setItem('jwt', jwt)
      window.localStorage.setItem('userData', JSON.stringify(user))
      router.push('/rooms')
    } else if (res.statusCode === 400) {
      setErrors(res.errorMessage)
      setLoading(false)
    } else {
      setErrors('Something went wrong. Please try again after some time')
      setLoading(false)
    }
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={12} sm={4.5} sx={{ mt: 15 }}>
        <Card sx={{ boxShadow: 2, p: 2, mx: { xs: 2, sm: 0 } }}>
          <CardContent>
            <TextField
              variant="standard"
              standard-basic
              label="First Name"
              onChange={handleChange('firstName')}
              sx={{ width: '100%', mb: 4 }}
            />
            <TextField
              variant="standard"
              standard-basic
              label="Last Name"
              onChange={handleChange('lastName')}
              sx={{ width: '100%', mb: 4 }}
            />
            <TextField
              variant="standard"
              standard-basic
              label="Email"
              onChange={handleChange('email')}
              sx={{ width: '100%', mb: 4 }}
            />
            <FormControl variant="standard" sx={{ width: '100%', mb: 4 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel htmlFor="password-conform">
                Confirm Password
              </InputLabel>
              <Input
                id="password-confirm"
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordConfirm}
                onChange={handleChange('passwordConfirm')}
              />
            </FormControl>
            <Typography component="div" sx={{ color: 'red' }}>
              {errors}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container direction="row" justifyContent="center" Elavated>
              <LoadingButton
                sx={{ px: 5 }}
                item
                variant="contained"
                size="large"
                onClick={() =>
                  initsignup({
                    email: values.email,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                  })
                }
                loading={loading}
              >
                sign Up
              </LoadingButton>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
