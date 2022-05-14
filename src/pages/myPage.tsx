import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'

import { getAuth, signOut } from 'firebase/auth'
import { doc, collection, addDoc, updateDoc, getDoc } from 'firebase/firestore'
import Router from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import AddFamilyGroup from '@/components/myPage/AddFamilyGroup'
import { AuthContext } from '@/firebase/auth'

import { db } from '@/firebase/firebase'
import { User } from '@/types/User'

export default function MyPage() {
  const { currentUser } = useContext(AuthContext)
  const auth = getAuth()
  const [name, setName] = useState('')
  const [user, setUser] = useState<User | undefined>()

  const getUser = async (id: string) => {
    const docRef = doc(db, 'users', id)
    const data = await getDoc(docRef)
    const userData = data.data() as User
    setUser(userData)
  }

  const addGroupId = async (user: User | undefined, id: string) => {
    const userDoc = doc(db, 'users', user!.id)
    const newFields = { groupId: id }
    await updateDoc(userDoc, newFields)
  }

  const handleAddFamilyGroup = async () => {
    const docRef = await addDoc(collection(db, 'familyGroup'), {
      groupName: name,
    })
    addGroupId(user, docRef.id)
      .then(() => {
        Router.push('/todo')
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Router.push('/')
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const handleChangeName = (e: any) => {
    setName(e.target.value)
  }

  useEffect(() => {
    if (!currentUser) {
      Router.push('/')
    } else {
      getUser(currentUser.uid)
    }
  }, [currentUser])

  return (
    <Container component='main' maxWidth='xs'>
      <p>{currentUser?.email}</p>
      {user?.groupId === '' && <AddFamilyGroup user={user} />}
      {/* <Box>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          onChange={handleChangeName}
        />
        <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={handleAddFamilyGroup}>
          Create Family Group
        </Button>
      </Box> */}
      <Box>
        <Button variant='contained' sx={{ mt: 3, mb: 2 }} onClick={handleSignOut}>
          Logout
        </Button>
      </Box>
    </Container>
  )
}
