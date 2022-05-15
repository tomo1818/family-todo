import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@/context/UserContext'
import { AuthProvider } from '@/firebase/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  )
}

export default MyApp
