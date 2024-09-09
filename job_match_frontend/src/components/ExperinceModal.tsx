import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Education, WorkExperience } from '../types/types'
import Button from '../components/Button'

interface ModalProps {
  show: boolean
  onClose: () => void
  onSave: (data: WorkExperience | Education) => void
  data: WorkExperience | Education | any
  type: 'experience' | 'education'
}

const ExperinceModal: React.FC<ModalProps> = ({
  show,
  onClose,
  onSave,
  data,
  type,
}) => {
  const [formData, setFormData] = useState(data)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setFormData(data)
  }, [data])

  useEffect(() => {
    console.log('Modal show state:', show)
  }, [show])

  if (!show) return null

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (type === 'experience') {
      if (!formData.occupation_title)
        newErrors.occupation_title = 'Titel är obligatoriskt'
      if (!formData.company_name)
        newErrors.company_name = 'Företag är obligatoriskt'
    } else if (type === 'education') {
      if (!formData.school_name)
        newErrors.school_name = 'Skola är obligatoriskt'
      if (!formData.level) newErrors.level = 'Nivå är obligatoriskt'
      if (!formData.orientation)
        newErrors.orientation = 'Inriktning är obligatoriskt'
    }
    if (!formData.years) newErrors.years = 'År är obligatoriskt'
    if (!formData.description)
      newErrors.description = 'Beskrivning är obligatoriskt'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    if (validate()) {
      onSave(formData)
      onClose()
    }
  }

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <ModalBackdrop>
      <ModalContainer onClick={handleModalClick}>
        <FormField>
          <Label>{type === 'experience' ? 'Titel:' : 'Skola:'}</Label>
          <Input
            name={type === 'experience' ? 'occupation_title' : 'school_name'}
            type="text"
            value={
              type === 'experience'
                ? formData.occupation_title
                : formData.school_name || ''
            }
            onChange={handleChange}
          />
          {errors.occupation_title && (
            <ErrorText>{errors.occupation_title}</ErrorText>
          )}
          {errors.school_name && <ErrorText>{errors.school_name}</ErrorText>}
        </FormField>
        {type === 'experience' && (
          <FormField>
            <Label>Företag:</Label>
            <Input
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
            />
            {errors.company_name && (
              <ErrorText>{errors.company_name}</ErrorText>
            )}
          </FormField>
        )}
        <FormField>
          <Label>År:</Label>
          <Input
            name="years"
            type="text"
            maxLength={2}
            value={formData.years}
            onChange={handleChange}
          />
          {errors.years && <ErrorText>{errors.years}</ErrorText>}
        </FormField>
        {type === 'education' && (
          <>
            <FormField>
              <Label>Nivå:</Label>
              <Input
                name="level"
                type="text"
                value={formData.level}
                onChange={handleChange}
              />
              {errors.level && <ErrorText>{errors.level}</ErrorText>}
            </FormField>
            <FormField>
              <Label>Inriktning:</Label>
              <Input
                name="orientation"
                type="text"
                value={formData.orientation}
                onChange={handleChange}
              />
              {errors.orientation && (
                <ErrorText>{errors.orientation}</ErrorText>
              )}
            </FormField>
          </>
        )}
        <FormField>
          <Label>Beskrivning:</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </FormField>
        <Button onClick={handleSave}>Spara</Button>
        <Button variant="secondary" onClick={onClose}>
          Avbryt
        </Button>
      </ModalContainer>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
`

const FormField = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const TextArea = styled.textarea`
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  min-height: 100px;
`

const ErrorText = styled.span`
  color: red;
  font-size: 0.9rem;
`

export default ExperinceModal
