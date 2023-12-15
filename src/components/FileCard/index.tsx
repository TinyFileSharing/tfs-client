import './styles.css'
import { useStorage } from '../../contexts/storage-provider'
import { toReadableSize } from '../../utils/files'
import { Card } from '../Card'
import { shortenString } from '../../utils/strings'
import { toReadableTime } from '../../utils/time'
import DownloadIcon from '@mui/icons-material/Download'
import IosShareIcon from '@mui/icons-material/IosShare'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { filenameToSvgIcon } from '../../utils/icons'

interface FileCardProps {
   file: FileRecord
}

export const FileCard = ({ file }: FileCardProps) => {
   const { downloadFile, deleteFile, shareFile } = useStorage()

   return (
      <Card className='file-card'>
         <div className='row'>
            <div className='filename'>
               <img src={filenameToSvgIcon(file.name)} />
               <div className='bold'>{shortenString(file.name, 20, 'end')}</div>
            </div>
            <div className='file-btns'>
               <div className='btn primary' onClick={() => downloadFile(file.id)}>
                  <DownloadIcon />
               </div>
               <div className='btn' onClick={() => deleteFile(file.id)}>
                  <DeleteOutlineIcon />
               </div>
               <div className='btn' onClick={() => shareFile(file.id)}>
                  <IosShareIcon />
               </div>
            </div>
         </div>
         <div className='row'>
            <div className='medium'>
               {toReadableSize(file.size)} • {toReadableTime(file.createdAt)}
            </div>
            <div className='medium'>Expires {toReadableTime(file.expirationAt)}</div>
         </div>
      </Card>
   )
}
