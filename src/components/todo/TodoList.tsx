import { getDoc, doc, collection, getDocs } from '@firebase/firestore'
import { useContext, useState, useEffect } from 'react'
import Loading from '../common/Loading'
import List from './List'
import { UserContext } from '@/context/UserContext'
import { db } from '@/firebase/firebase'

import { User } from '@/types/User'
import { TodoCategory } from '@/types/TodoCategory'
import { Todo } from '@/types/Todo'

type Props = {
  user: User | undefined
  category: TodoCategory | undefined
}

export default function TodoList() {
  const { user, category }: Props = useContext(UserContext)
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getTodos = async () => {
      const todoCollectionRef = collection(
        db,
        'familyGroup',
        user!.groupId,
        'todoCategory',
        category!.id,
        'todos',
      )
      const todosData = await getDocs(todoCollectionRef)
      let newTodos: Todo[] = []
      todosData.docs.map(async (doc) => {
        const todo = doc.data() as Todo
        newTodos = [...newTodos, todo]
      })
      setTodos(newTodos)
    }
    if (user && category) {
      getTodos()
      setLoading(false)
    }
  }, [user, category])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>Todoの一覧</h2>
      {console.log(todos)}
      <List todos={todos} />
    </div>
  )
}
