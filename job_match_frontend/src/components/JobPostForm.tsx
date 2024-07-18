import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { EmployerJobPost } from '../types/types'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (value: EmployerJobPost) => void
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
  const initialFormData: EmployerJobPost = {
    company_name: '',
    job_post_title: '',
    job_description: '',
    location: '',
    employment_type: 'Tillsvidareanställning',
    is_published: false,
    phone_number: '',
    expiration_date: new Date(),
  }

  const [formData, setFormData] = useState<EmployerJobPost>(initialFormData)
  const [isChecked, setIsChecked] = useState(false)

  const [errors, setErrors] = useState({
    company_name: '',
    job_post_title: '',
    job_description: '',
    location: '',
    phone_number: '',
  })

  useEffect(() => {
    if (editItem) {
      setFormData({
        ...editItem,
        expiration_date: new Date(editItem.expiration_date),
      })
    } else {
      setFormData(initialFormData)
    }
  }, [editItem, initialFormData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      employment_type: selectedOption,
    }))
  }

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDate(date)
      setFormData((prevState) => ({
        ...prevState,
        expiration_date: formattedDate,
      }))
    }
  }

  const handleClose = () => {
    onClose()
    setFormData(initialFormData)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let hasErrors = false
    const newErrors = { ...errors }
    if (formData.job_post_title.length < 5) {
      newErrors.job_post_title = 'Job title must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.company_name.length < 5) {
      newErrors.company_name = 'Company name must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.location.length < 5) {
      newErrors.location = 'Location must be at least 5 characters long'
      hasErrors = true
    }
    if (formData.job_description.length < 5) {
      newErrors.job_description =
        'Job description must be at least 5 characters long'
      hasErrors = true
    }
    if (hasErrors) {
      setErrors(newErrors)
      return
    } else {
      const formattedData = {
        ...formData,
        expiration_date: formatDate(new Date(formData.expiration_date)),
      }
      onSubmit(formattedData)
      onClose()
      setFormData(initialFormData)
    }
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
    setFormData((prevState) => ({
      ...prevState,
      is_published: !isChecked,
    }))
  }

  if (!isOpen) return null

  return (
    <ModalBackground>
      <ModalContent>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="job_post_title">Job title:</Label>
            <Input
              type="text"
              id="job_post_title"
              name="job_post_title"
              value={formData.job_post_title}
              onChange={handleChange}
            />
            {errors.job_post_title && <Span>{errors.job_post_title}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company_name">Company name:</Label>
            <Input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
            />
            {errors.company_name && <Span>{errors.company_name}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone_number">Mobilnummer:</Label>
            <Input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && <Span>{errors.phone_number}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Location:</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <Span>{errors.location}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job_description">Description:</Label>
            <TextArea
              id="job_description"
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
            />
            {errors.job_description && <Span>{errors.job_description}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="employment_type">Employment Type:</Label>
            <StyledSelect
              name="employment_type"
              id="employment_type"
              value={formData.employment_type}
              onChange={handleSelectChange}
            >
              <option value="Tillsvidareanställning">
                Tillsvidareanställning
              </option>
              <option value="Provanställning">Provanställning</option>
              <option value="Deltid">Deltid</option>
            </StyledSelect>
          </FormGroup>
          <DatePickerGroup>
            <Label htmlFor="expiration_date">Utgångsdatum:</Label>
            <DatePicker
              selected={
                formData.expiration_date
                  ? new Date(formData.expiration_date)
                  : null
              }
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
          </DatePickerGroup>
          <FormGroup>
            <label>Publicera jobbannons? </label>
            <input type="checkbox" checked={isChecked} onChange={handleCheck} />
          </FormGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={handleClose}>
              Cancel
            </CancelButton>
            <Button type="submit">{primaryButtonText}</Button>
          </ButtonGroup>
        </StyledForm>
      </ModalContent>
    </ModalBackground>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
  margin-bottom: 1rem;
`

const DatePickerGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  margin-right: 0.5rem;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSelect = styled.select`
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

export default FormComponent
