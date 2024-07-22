import React, { Fragment } from 'react'
import styled from 'styled-components'

interface CustomModalProps {
  primaryButtonTitle: string
  onPrimaryButtonPress: () => void
  secondaryButtonTitle: string
  onSecondaryButtonPress: () => void
  visible: boolean
  onClose: () => void
  modalText: string
  modalTitle: string
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  primaryButtonTitle,
  onPrimaryButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress,
  modalText,
  modalTitle,
}) => {
  if (!visible) return null

  return (
    <Fragment>
      <Backdrop onClick={onClose} />
      <ModalContainer>
        <Title>{modalTitle}</Title>
        <ModalContent>{modalText}</ModalContent>
        <ButtonContainer>
          <Button onClick={onSecondaryButtonPress} secondary>
            {secondaryButtonTitle}
          </Button>
          <Button onClick={onPrimaryButtonPress}>{primaryButtonTitle}</Button>
        </ButtonContainer>
      </ModalContainer>
    </Fragment>
  )
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 95%;
    padding: 15px;
  }
`

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 1.5rem;
  text-align: center;
`

const ModalContent = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const Button = styled.button<{ secondary?: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  background: ${(props) => (props.secondary ? '#6c757d' : '#007bff')};
  color: white;

  &:hover {
    background: ${(props) => (props.secondary ? '#5a6268' : '#0056b3')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    background: ${(props) => (props.secondary ? '#565e62' : '#004085')};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }
`
