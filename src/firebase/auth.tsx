import { getAuth } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { app } from '@/firebase/firebase'

interface IAuthContext {
  currentUser: any | null | undefined
}

// Contextを宣言。Contextの中身を {currentUser: undefined} と定義
const AuthContext = createContext<IAuthContext>({ currentUser: undefined })

const AuthProvider = (props: any) => {
  // Contextに持たせるcurrentUserは内部的にはuseStateで管理
  const [currentUser, setCurrentUser] = useState<any | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const auth = getAuth(app)

  useEffect(() => {
    // Firebase Authのメソッド。ログイン状態が変化すると呼び出される
    // auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    // })
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
