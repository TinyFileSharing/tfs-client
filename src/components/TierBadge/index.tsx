import './styles.css'

interface TierBadgeProps {
   label: string
}

export const TierBadge = ({ label }: TierBadgeProps) => {
   const isFreemium = label === 'tier:0'
   const name = label === 'tier:0' ? 'freemium' : label?.includes('tier:') ? 'premium' : label
   return <div className={'tier-badge' + (isFreemium ? ' freemium' : ' pro')}>{name}</div>
}
