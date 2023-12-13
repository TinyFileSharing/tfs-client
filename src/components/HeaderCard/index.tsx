import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useStorage } from '../../contexts/storage-provider'
import { LogoutButton } from '../../components/LogoutButton'
import { Card } from '../../components/Card'
import { ProgressBar } from '../../components/ProgressBar'
import { TierBadge } from '../../components/TierBadge'

export const HeaderCard = () => {
   const { user } = useAuth0()
   const { isLoading, storageDetails } = useStorage()

   return !isLoading ? (
      <Card>
         {user?.name}
         <LogoutButton />
         <div className='storage-capacity'>
            {storageDetails.storageUsed} of {storageDetails.storageCapacity}
         </div>
         <ProgressBar percentage={storageDetails.storageUsedPercentage!} />
         <div className='storage-file-count'>{storageDetails.fileCount} files</div>
         <div className='storage-tier'>
            <TierBadge label={storageDetails.tierLabel!} />
         </div>
      </Card>
   ) : (
      <div>Loading...</div>
   )
}
