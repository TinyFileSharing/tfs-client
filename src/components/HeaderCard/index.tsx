import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useStorage } from '../../contexts/storage-provider'
import { LogoutButton } from '../LogoutButton'
import { Card } from '../../components/Card'
import { ProgressBar } from '../../components/ProgressBar'
import { TierBadge } from '../../components/TierBadge'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

export const HeaderCard = () => {
   const { user } = useAuth0()
   const { storageDetails } = useStorage()

   const usedMB = Math.round(storageDetails.storageUsed! / 100)
   const totalMB = Math.round(storageDetails.storageCapacity! / 100)

   return (
      <Card className='header-card'>
         <div className='header-name-group'>
            <div className='bold'>{user?.name}</div>
            <LogoutButton />
         </div>
         <div className='header-storage-group'>
            <span>
               <span className='bold'>{usedMB}</span>
               <span className='regular-alt'> of {totalMB} MB used</span>
            </span>
            <ProgressBar percentage={storageDetails.storageUsedPercentage!} />
            <div className='storage-file-count regular-alt'>
               <CloudQueueIcon style={{ fontSize: 20 }} />
               <span>{storageDetails.fileCount} files saved</span>
            </div>
         </div>
         <div className='storage-tier'>
            <TierBadge label={storageDetails.tierLabel!} />
         </div>
      </Card>
   )
}
