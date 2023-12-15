import './styles.css'
import { CSSProperties, PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
   className?: string
   style?: CSSProperties
}

export const Card = ({ children, style, className }: CardProps) => {
   return (
      <div className={'card ' + className} style={style}>
         {children}
      </div>
   )
}
