import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useStorage } from '../../contexts/storage-provider'
import { LogoutButton } from '../LogoutButton'
import { Card } from '../../components/Card'
import { ProgressBar } from '../../components/ProgressBar'
import { TierBadge } from '../../components/TierBadge'

export const HeaderCard = () => {
   const { user } = useAuth0()
   const { storageDetails } = useStorage()

   return (
      <Card>
         <div className='profile-name'>{user?.name}</div>
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
   )
}
