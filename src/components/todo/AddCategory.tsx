import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'

type Props = {
  user: User | undefined
  group: FamilyGroup | undefined
}

export default function AddCategory(props: Props) {
  const [title, setTitle] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')
  const { user, group } = props

  const createCategory = async () => {
    const familyGroupCollectionRef = collection(db, 'familyGroup', group!.id, 'todoCategory')
  }

  const addUserInGroup = async (id: string, groupId: string) => {
    const userDoc = doc(db, 'users', id)
    const newFields = { groupId: groupId }
    await updateDoc(userDoc, newFields)
  }

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    createCategory()
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Outlined'
          variant='outlined'
          onChange={handleChangeTitle}
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Create Category
        </Button>
      </Box>
    </Container>
  )
}
