import { useAuth0 } from '@auth0/auth0-react'
import { PropsWithChildren } from 'react'

export const Unauthenticated = ({ children }: PropsWithChildren) => {
   const { isAuthenticated } = useAuth0()
   return !isAuthenticated ? <>{children}</> : null
}
