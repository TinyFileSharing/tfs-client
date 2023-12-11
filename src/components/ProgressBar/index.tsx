import './styles.css'

interface ProgressBarProps {
   percentage: number
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
   return (
      <div className='progress-bar'>
         <div className='line complete' style={{ width: `${percentage}%` }} />
         <div className='line incomplete' style={{ width: `${100 - percentage}%` }} />
      </div>
   )
}
