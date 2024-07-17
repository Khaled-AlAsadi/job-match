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
  return (
    <Fragment>
      {visible && (
        <ModalContainer className="modal">
          <Title>{modalTitle}</Title>
          <p>{modalText}</p>
          <button onClick={onSecondaryButtonPress}>
            {secondaryButtonTitle}
          </button>
          <button onClick={onPrimaryButtonPress}>{primaryButtonTitle}</button>
        </ModalContainer>
      )}
    </Fragment>
  )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const Title = styled.h2`
  max-width: 400px;
`
