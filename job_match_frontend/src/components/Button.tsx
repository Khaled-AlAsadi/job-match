import React, { CSSProperties, ReactNode, MouseEvent } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'delete'
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  style,
  onClick,
}) => {
  return (
    <StyledButton variant={variant} style={style} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'delete'
}>`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#007BFF' // Bright Blue
      case 'secondary':
        return '#6C757D' // Dark Gray
      case 'delete':
        return '#DC3545' // Bright Red
      default:
        return '#007BFF' // Default to Bright Blue
    }
  }};

  color: ${({ variant }) => (variant === 'delete' ? '#FFFFFF' : '#FFFFFF')};

  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return '#0056b3' // Darker Blue
        case 'secondary':
          return '#5a6268' // Darker Gray
        case 'delete':
          return '#c82333' // Darker Red
        default:
          return '#0056b3' // Default to Darker Blue
      }
    }};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
`

export default Button
