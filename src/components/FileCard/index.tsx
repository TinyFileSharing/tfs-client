import './styles.css'
import { useStorage } from '../../contexts/storage-provider'
import { toReadableSize } from '../../utils/files'
import { Card } from '../Card'

interface FileCardProps {
   file: FileRecord
}

export const FileCard = ({ file }: FileCardProps) => {
   const { downloadFile, deleteFile, shareFile } = useStorage()

   return (
      <Card>
         <div className='file-name bold'>{file.name}</div>
         <div className='file-size'>{toReadableSize(file.size)}</div>
         <div className='file-creation'>{file.createdAt.toString()}</div>
         <div className='file-expiration'>{file.expirationAt.toString()}</div>
         <input type='button' value='Share' onClick={() => shareFile(file.id)} />
         <input type='button' value='Download' onClick={() => downloadFile(file.id)} />
         <input type='button' value='Delete' onClick={() => deleteFile(file.id)} />
      </Card>
   )
}
