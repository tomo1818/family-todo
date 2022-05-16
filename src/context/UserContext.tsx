import { getDoc, doc, collection, getDocs } from '@firebase/firestore'

import Router from 'next/router'
import { createContext, useState, useContext, useEffect, SetStateAction, Dispatch } from 'react'
import Loading from '@/components/common/Loading'
import { AuthContext } from '@/firebase/auth'
import { db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'
import { TodoCategory } from '@/types/TodoCategory'
import { Todo } from '@/types/Todo'

interface IUserContext {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  group: FamilyGroup | undefined
  setGroup: Dispatch<SetStateAction<FamilyGroup | undefined>>
  category: TodoCategory | undefined
  setCategory: Dispatch<SetStateAction<TodoCategory | undefined>>
  categories: TodoCategory[]
  setCategories: Dispatch<SetStateAction<TodoCategory[]>>
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
  group: undefined,
  setGroup: () => {},
  category: undefined,
  setCategory: () => {},
  categories: [],
  setCategories: () => {},
})

const UserProvider = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User | undefined>()
  const [group, setGroup] = useState<FamilyGroup | undefined>()
  const [category, setCategory] = useState<TodoCategory | undefined>()
  const [categories, setCategories] = useState<TodoCategory[]>([])
  const [todos, setTodos] = useState<Todo[] | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const getUserInfo = async (id: string) => {
    const docRef = doc(db, 'users', id)
    const data = await getDoc(docRef)
    const userData = data.data() as User
    setUser(userData)
    if (userData!.groupId !== '') {
      getGroup(userData!.groupId)
      getCategories(userData!.groupId)
    }
  }

  const getGroup = async (id: string) => {
    const docRef = doc(db, 'familyGroup', id)
    const data = await getDoc(docRef)
    const groupData = data.data() as FamilyGroup
    setGroup(groupData)
  }

  const getCategories = async (id: string) => {
    const collectionRef = collection(db, 'familyGroup', id, 'todoCategory')
    const data = await getDocs(collectionRef)
    data.docs.map((doc, i) => {
      const category = doc.data() as TodoCategory
      if (i === 0) setCategory(category)
      setCategories([...categories, category])
    })
  }

  useEffect(() => {
    if (!currentUser) {
      Router.push('/')
    } else {
      getUserInfo(currentUser.uid)
      setLoading(false)
    }
  }, [currentUser])

  if (loading) {
    return <Loading />
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        group: group,
        setGroup: setGroup,
        category: category,
        setCategory: setCategory,
        categories: categories,
        setCategories: setCategories,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
