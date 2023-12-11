import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { LogoutButton } from '../../components/LogoutButton'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'

export const Dashboard = () => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0()

   useEffect(() => {
      if (isAuthenticated) {
         getAccessTokenSilently().then(console.log).catch(console.log)
      }
   }, [getAccessTokenSilently, isAuthenticated])

   return (
      <div className='container'>
         <Authenticated>
            <LogoutButton />
         </Authenticated>
         <Unauthenticated>
            <LoginButton />
         </Unauthenticated>
      </div>
   )
}
