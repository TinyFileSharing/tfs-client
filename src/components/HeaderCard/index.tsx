import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useStorage } from '../../contexts/storage-provider'
import { toReadableSize } from '../../utils/files'
import { LogoutButton } from '../LogoutButton'
import { Card } from '../../components/Card'
import { ProgressBar } from '../../components/ProgressBar'
import { TierBadge } from '../../components/TierBadge'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

export const HeaderCard = () => {
   const { user } = useAuth0()
   const { storageDetails } = useStorage()

   const used = toReadableSize(storageDetails.storageUsed!, true)
   const total = toReadableSize(storageDetails.storageCapacity!, true)

   return (
      <Card className='header-card'>
         <div className='header-name-group'>
            <div className='bold'>{user?.name}</div>
            <LogoutButton />
         </div>
         <div className='header-storage-group'>
            <span className='storage-details'>
               <span className='bold'>{used}</span>
               <span className='regular-alt'> of {total} used</span>
            </span>
            <ProgressBar percentage={storageDetails.storageUsedPercentage!} />
            <div className='storage-file-count regular-alt'>
               <CloudQueueIcon style={{ fontSize: 20 }} />
               <span>
                  {storageDetails.fileCount} {storageDetails.fileCount! > 1 ? 'files' : 'file'} stored
               </span>
            </div>
         </div>
         <div className='storage-tier'>
            <TierBadge label={storageDetails.tierLabel!} />
         </div>
      </Card>
   )
}
