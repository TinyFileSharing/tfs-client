import './styles.css'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'
import { useStorage } from '../../contexts/storage-provider'
import { Card } from '../../components/Card'
import { HeaderCard } from '../../components/HeaderCard'
import { FileCard } from '../../components/FileCard'
import { UploadCard } from '../../components/UploadCard'

export const Dashboard = () => {
   const { fileRecords } = useStorage()

   return (
      <div className='dashboard'>
         <Unauthenticated>
            <Card>
               <LoginButton />
            </Card>
         </Unauthenticated>

         <Authenticated>
            <div className='card-list'>
               <HeaderCard />
               <UploadCard />

               {fileRecords.map(file => (
                  <FileCard key={file.id} file={file} />
               ))}

               <Card>Footer</Card>
            </div>
         </Authenticated>
      </div>
   )
}
