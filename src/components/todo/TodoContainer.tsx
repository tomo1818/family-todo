import { getDoc, doc, collection } from '@firebase/firestore'
import Container from '@mui/material/Container'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import AddCategory from './AddCategory'
import TodoList from './TodoList'
import TodoModal from './TodoModal'
import { AuthContext } from '@/firebase/auth'
import { app, db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'

type Props = {
  user: User | undefined
  group: FamilyGroup | undefined
}

export const TodoContainer = (props: Props) => {
  const [category, setCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const { user, group } = props

  return (
    <Container component='main' maxWidth='xs'>
      <h1>Todo Pageです</h1>
      <AddCategory user={user} group={group} />
      <TodoList user={user} category={category} />
      <TodoModal />
    </Container>
  )
}
