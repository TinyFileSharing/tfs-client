import './styles.css'
import { LoginButton } from '../../components/LoginButton'
import { Authenticated } from '../../components/Authenticated'
import { Unauthenticated } from '../../components/Unauthenticated'
import { useStorage } from '../../hooks/use-storage'
import { Card } from '../../components/Card'
import { HeaderCard } from '../../components/HeaderCard'
import { FileCard } from '../../components/FileCard.tsx'

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

               {fileRecords?.map(file => (
                  <FileCard key={file.id} file={file} />
               ))}
            </div>
         </Authenticated>
      </div>
   )
}
