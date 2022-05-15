import React, { useContext } from 'react'
import { TodoContainer } from '@/components/todo/TodoContainer'
import { UserContext } from '@/context/UserContext'

export default function Todo() {
  const { user, group, categories } = useContext(UserContext)

  return (
    <>
      <TodoContainer user={user} group={group}></TodoContainer>
    </>
  )
}
