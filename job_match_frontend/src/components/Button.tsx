import React, { CSSProperties, ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children: ReactNode
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ children, style, onClick }) => {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
