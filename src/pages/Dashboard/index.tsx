import './styles.css'
import { LogoutButton } from '../../components/LogoutButton'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'
import { useStorage } from '../../hooks/use-storage'
import { Card } from '../../components/Card'
import { useAuth0 } from '@auth0/auth0-react'
import { ProgressBar } from '../../components/ProgressBar'
import { TierBadge } from '../../components/TierBadge'

export const Dashboard = () => {
   const { user } = useAuth0()
   const { storageDetails, fileRecords } = useStorage()

   return (
      <div className='dashboard'>
         <Unauthenticated>
            <Card>
               <LoginButton />
            </Card>
         </Unauthenticated>
         <Authenticated>
            <div className='card-list'>
               <Card>
                  {user?.name}
                  <LogoutButton />
                  <div className='storage-capacity'>
                     {storageDetails?.storageUsed} of {storageDetails?.storageCapacity}
                  </div>
                  <ProgressBar percentage={storageDetails?.storageUsedPercentage!} />
                  <div className='storage-file-count'>{storageDetails?.fileCount} files</div>
                  <div className='storage-tier'>
                     <TierBadge label={storageDetails?.tierLabel!} />
                  </div>
               </Card>

               {fileRecords?.map(file => (
                  <Card key={file.id}>
                     <div className='file-name'>{file.name}</div>
                     <div className='file-size'>{file.size}</div>
                     <div className='file-creation'>{file.createdAt.toString()}</div>
                     <div className='file-expiration'>{file.expirationAt.toString()}</div>
                  </Card>
               ))}
            </div>
         </Authenticated>
      </div>
   )
}
