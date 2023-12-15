import './styles.css'
import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export const Card = ({ children, className, ...props }: CardProps) => {
   return (
      <div className={`card${className ? ' ' + className : ''}`} {...props}>
         {children}
      </div>
   )
}
