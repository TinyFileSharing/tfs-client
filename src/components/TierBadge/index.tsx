import './styles.css'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface TierBadgeProps {
   label: string
}

export const TierBadge = ({ label }: TierBadgeProps) => {
   const isFreemium = label === 'tier:0'
   const name = label === 'tier:0' ? 'freemium' : label?.includes('tier:') ? 'premium' : label
   return (
      <div className='tier-badge'>
         <div className={'tier-label' + (isFreemium ? ' freemium' : ' pro')}>{name}</div>
         {isFreemium && (
            <span className='upgrade-tier-prompt'>
               <AutoAwesomeIcon style={{ fontSize: 20, color: '#e3007a' }} /> Upgrade tier
            </span>
         )}
      </div>
   )
}
