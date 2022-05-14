import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { doc, collection, addDoc, updateDoc, getDoc } from 'firebase/firestore'
import Router from 'next/router'
import { useState } from 'react'
import { db } from '@/firebase/firebase'
import { User } from '@/types/User'

export default function AddFamilyGroup(user: any) {
  const [name, setName] = useState('')
  const currentUser: User | undefined = user.user

  const handleChangeName = (e: any) => {
    setName(e.target.value)
  }

  const addGroupId = async (user: User | undefined, id: string) => {
    const userDoc = doc(db, 'users', user!.id)
    const newFields = { groupId: id }
    await updateDoc(userDoc, newFields)
    await updateDoc(doc(db, 'familyGroup', id), { id: id, groupMember: [user!.id] })
  }

  const handleAddFamilyGroup = async () => {
    const docRef = await addDoc(collection(db, 'familyGroup'), {
      id: '',
      groupName: name,
      groupMember: []
    })
    addGroupId(currentUser, docRef.id).then(() => {
      Router.push('/todo')
    })
  }

  return (
    <Box>
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
    </Box>
  )
}
