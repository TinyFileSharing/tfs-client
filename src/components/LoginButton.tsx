import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
   const { loginWithRedirect } = useAuth0()

   const handleLogin = () => {
      loginWithRedirect()
   }

   return <input type='button' value='Login' onClick={handleLogin} />
}
