import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/common/Header'
import { UserProvider } from '@/context/UserContext'
import { AuthProvider } from '@/firebase/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  )
}

export default MyApp
