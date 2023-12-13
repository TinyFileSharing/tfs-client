import './styles.css'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'
import { useStorage } from '../../contexts/storage-provider'
import { Card } from '../../components/Card'
import { HeaderCard } from '../../components/HeaderCard'
import { FileCard } from '../../components/FileCard'
import { UploadCard } from '../../components/UploadCard'
import { useAuth0 } from '@auth0/auth0-react'

export const Dashboard = () => {
   const { isLoading: isAuthLoading } = useAuth0()
   const { isLoading, fileRecords, loadNextRecords } = useStorage()

   console.log(isAuthLoading)

   return (
      <div className='dashboard'>
         {!isAuthLoading ? (
            <>
               <Unauthenticated>
                  <Card>
                     <LoginButton />
                  </Card>
               </Unauthenticated>

               <Authenticated>
                  {!isLoading ? (
                     <div className='card-list'>
                        <HeaderCard />
                        <UploadCard />

                        {fileRecords.map(file => (
                           <FileCard key={file.id} file={file} />
                        ))}

                        {/* <input type='button' value='Load next' onClick={loadNextRecords} /> */}

                        <Card>Footer</Card>
                     </div>
                  ) : (
                     <Card>Loading...</Card>
                  )}
               </Authenticated>
            </>
         ) : (
            <Card>Signing in...</Card>
         )}
      </div>
   )
}
