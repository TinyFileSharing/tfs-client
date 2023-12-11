import './styles.css'
import { useStorage } from '../../hooks/use-storage'
import { Card } from '../Card'

interface FileCardProps {
   file: FileRecord
}

export const FileCard = ({ file }: FileCardProps) => {
   const { downloadFile, deleteFile } = useStorage()

   return (
      <Card>
         <div className='file-name'>{file.name}</div>
         <div className='file-size'>{file.size}</div>
         <div className='file-creation'>{file.createdAt.toString()}</div>
         <div className='file-expiration'>{file.expirationAt.toString()}</div>
         <input type='button' value='Download' onClick={() => downloadFile(file.id)} />
         <input type='button' value='Delete' onClick={() => deleteFile(file.id)} />
      </Card>
   )
}
