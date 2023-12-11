import './styles.css'
import { LogoutButton } from '../../components/LogoutButton'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'
import { useStorage } from '../../hooks/use-storage'

export const Dashboard = () => {
   const { storageDetails, fileRecords } = useStorage()

   return (
      <div className='container'>
         <Unauthenticated>
            <LoginButton />
         </Unauthenticated>
         <Authenticated>
            <LogoutButton />

            <pre>{JSON.stringify(storageDetails, null, 2)}</pre>
            <pre>{JSON.stringify(fileRecords, null, 2)}</pre>
         </Authenticated>
      </div>
   )
}
