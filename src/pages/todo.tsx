import { getDoc, doc } from '@firebase/firestore'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Todo.module.scss'
import Loading from '@/components/common/Loading'
import { TodoContainer } from '@/components/todo/TodoContainer'
import { AuthContext } from '@/firebase/auth'
import { db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'

export default function Todo() {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User>()
  const [group, setGroup] = useState<FamilyGroup>()
  const [loading, setLoading] = useState(true)

  const getUser = async (id: string) => {
    const docRef = doc(db, 'users', id)
    const data = await getDoc(docRef)
    const userData = data.data() as User
    setUser(userData)
    userData!.groupId !== '' && getGroup(userData!.groupId)
  }

  const getGroup = async (id: string) => {
    const docRef = doc(db, 'familyGroup', id)
    const data = await getDoc(docRef)
    const groupData = data.data() as FamilyGroup
    setGroup(groupData)
  }

  useEffect(() => {
    if (!currentUser) {
      Router.push('/')
    } else {
      getUser(currentUser.uid)
      setLoading(false)
    }
  }, [currentUser])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <TodoContainer user={user} group={group}></TodoContainer>
    </>
  )
}
