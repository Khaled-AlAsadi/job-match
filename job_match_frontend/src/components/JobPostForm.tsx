import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (value: any) => void
  primaryButtonText: string
  editItem?: any
}

const FormComponent: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  primaryButtonText,
  editItem,
}) => {
  const initialFormData = {
    companyName: '',
    jobPostTitle: '',
    jobDescription: '',
    jobLocation: '',
    EmploymentType: '',
  }

  const [formData, setFormData] = useState({
    companyName: '',
    jobPostTitle: '',
    jobDescription: '',
    jobLocation: '',
    EmploymentType: '',
  })
  const [errors, setErrors] = useState({
    companyName: '',
    jobPostTitle: '',
    jobDescription: '',
    jobLocation: '',
  })

  useEffect(() => {
    if (editItem) {
      setFormData(editItem)
    } else {
      setFormData(initialFormData)
    }
  }, [editItem])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }))
  }

  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      EmploymentType: selectedOption,
    }))
  }
  const handleClose = () => {
    onClose()
    // setFormData({
    //   companyName: '',
    //   jobPostTitle: '',
    //   jobDescription: '',
    //   jobLocation: '',
    //   EmploymentType: 'Tillsvidareanställning',
    // })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let hasErrors = false
    const newErrors = { ...errors }
    if (formData.jobPostTitle.length < 5) {
      newErrors.jobPostTitle = 'jobPostTitle must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.companyName.length < 5) {
      newErrors.companyName = 'companyName must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.jobLocation.length < 5) {
      newErrors.jobLocation = 'jobLocation must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.jobDescription.length < 5) {
      newErrors.jobDescription =
        'jobDescription must be at least 5 characters long'
      hasErrors = true
    }
    if (hasErrors) {
      setErrors(newErrors)
      return
    } else {
      onSubmit(formData)
      onClose()
      setFormData({
        companyName: '',
        jobPostTitle: '',
        jobDescription: '',
        jobLocation: '',
        EmploymentType: 'Tillsvidareanställning',
      })
    }
  }

  if (!isOpen) return null

  return (
    <ModalBackground>
      <ModalContent>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="jobPostTitle">Jobtitel:</Label>
            <Input
              type="text"
              id="jobPostTitle"
              name="jobPostTitle"
              value={formData.jobPostTitle}
              onChange={handleChange}
            />
            {errors.jobPostTitle && <Span>{errors.jobPostTitle}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="companyName">Företagsnamn:</Label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <Span>{errors.companyName}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="jobLocation">Område:</Label>
            <Input
              id="jobLocation"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
            />
            {errors.jobLocation && <Span>{errors.jobLocation}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="jobDescription">Beskrivning:</Label>
            <TextArea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
            />
            {errors.jobDescription && <Span>{errors.jobDescription}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="EmploymentType">Type</Label>
            <StyledSelect
              name="EmploymentType"
              id="EmploymentType"
              value={formData.EmploymentType}
              onChange={handleSelectChange}
            >
              <option value="Tillsvidareanställning">
                Tillsvidareanställning
              </option>
              <option value="Provanställning">Provanställning</option>
              <option value="Deltid">Deltid</option>
            </StyledSelect>
          </FormGroup>
          <CancelButton onClick={handleClose}>Avbryt</CancelButton>
          <Button type="submit">{primaryButtonText}</Button>
        </StyledForm>
      </ModalContent>
    </ModalBackground>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 5px;
`

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 70%;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const Span = styled.span`
  color: red;
  display: block;
`

const TextArea = styled.textarea`
  width: 80%;
  max-height: 300px;
  resize: vertical;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: grey;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`
const StyledSelect = styled.select`
  width: 80%;
  max-height: 500px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`
export default FormComponent
