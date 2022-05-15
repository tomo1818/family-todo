import { getDoc, doc, collection } from '@firebase/firestore'

import Router from 'next/router'
import { createContext, useState, useContext, useEffect, SetStateAction, Dispatch } from 'react'
import Loading from '@/components/common/Loading'
import { AuthContext } from '@/firebase/auth'
import { db } from '@/firebase/firebase'
import { FamilyGroup } from '@/types/FamilyGroup'
import { User } from '@/types/User'

interface IUserContext {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  group: FamilyGroup | undefined
  setGroup: Dispatch<SetStateAction<FamilyGroup | undefined>>
  category: string
  setCategory: Dispatch<SetStateAction<string>>
  categories: string[]
  setCategories: Dispatch<SetStateAction<string[]>>
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
  group: undefined,
  setGroup: () => {},
  category: 'string',
  setCategory: () => {},
  categories: [],
  setCategories: () => {},
})

const UserProvider = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User | undefined>()
  const [group, setGroup] = useState<FamilyGroup | undefined>()
  const [category, setCategory] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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
