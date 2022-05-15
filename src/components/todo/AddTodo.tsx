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
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import Router from 'next/router'
import { useState, useEffect, useContext } from 'react'
import * as React from 'react'
import UUID from 'uuidjs'
import { UserContext } from '@/context/UserContext'
import { app, db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'
import { TodoCategory } from '@/types/TodoCategory'

const theme = createTheme()

type Props = {
  user: User | undefined
  group: FamilyGroup | undefined
  category: TodoCategory | undefined
}

export default function AddTodo(props: any) {
  const { user, group, category }: Props = useContext(UserContext)
  const [title, setTitle] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const [image, setImage] = useState()

  const createTodo = async () => {
    const data = {
      title: title,
      memo: memo,
      image: image,
      isComplete: false,
    }
    const todoCollectionRef = collection(db, 'familyGroup', user!.groupId, 'todoCategory', category!.id, 'todos')
    const docRef = await addDoc(todoCollectionRef, data)
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
                  name='期限'
                  onChange={(event) => handleChangeImage(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='exampleUrl'
                  label='メモ'
                  id='exampleUrl'
                  autoComplete='メモ'
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
