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
  const { user, group } = props

  const addCategory = async () => {
    const familyGroupCollectionRef = collection(db, 'familyGroup', group!.id, 'todoCategory')
    const docRef = await addDoc(familyGroupCollectionRef, { id: '', name: title })
    await updateDoc(doc(db, 'familyGroup', group!.id, 'todoCategory', docRef.id), {
      id: docRef.id,
    })
  }

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  return (
    <Box>
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        onChange={handleChangeTitle}
      />
      <Button onClick={addCategory} fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Add Category
      </Button>
    </Box>
  )
}
