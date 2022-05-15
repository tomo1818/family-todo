import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'
import Router from 'next/router'
import { useState, useEffect, useContext } from 'react'
import * as React from 'react'
import { AuthContext } from '@/firebase/auth'
import { app, db } from '@/firebase/firebase'

const theme = createTheme()

export default function AddTodo(props: any) {
  const { currentUser } = useContext(AuthContext)
  const [title, setTitle] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const [image, setImage] = useState()

  const auth = getAuth(app)
  const createTodo = async () => {
    const data = {
      title: title,
      memo: memo,
      image: image,
      isComplete: false,
    }
  }

  const handleSubmit = () => {
    createTodo()
  }

  const handleChangeTitle = (e: any) => {
    setTitle(e.currentTarget.value)
  }
  const handleChangeImage = (e: any) => {
    setImage(e.currentTarget.value)
  }
  const handleChangeMemo = (e: any) => {
    setMemo(e.currentTarget.value)
  }

  useEffect(() => {
    if (!currentUser) {
      Router.push('/')
    }
  }, [currentUser])

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Todo
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='todoName'
                  required
                  fullWidth
                  id='todoName'
                  label='Todoの名前'
                  autoFocus
                  onChange={(event) => handleChangeTitle(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='date'
                  id='date'
                  name='日付'
                  onChange={(event) => handleChangeImage(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='exampleUrl'
                  label='参考URL'
                  id='exampleUrl'
                  autoComplete='sample url'
                  onChange={(event) => handleChangeMemo(event)}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Todoを作成
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
