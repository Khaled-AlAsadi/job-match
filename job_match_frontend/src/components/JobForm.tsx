import React, { useEffect, useMemo, useState } from 'react'
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

const JobForm: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  primaryButtonText,
  editItem,
}) => {
  const initialFormData = useMemo(
    () => ({
      company_name: '',
      job_post_title: '',
      job_description: '',
      location: '',
      employment_type: 'Tillsvidareanställning',
      is_published: true,
      phone_number: '',
      expiration_date: new Date(),
    }),
    []
  )

  const [formData, setFormData] = useState<EmployerJobPost>(initialFormData)

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
      newErrors.job_post_title = 'Jobbtiteln måste vara minst 5 tecken lång'
      hasErrors = true
    }
    if (formData.company_name.length < 5) {
      newErrors.company_name = 'Företagsnamnet måste vara minst 5 tecken långt'
      hasErrors = true
    }
    if (formData.location.length < 5) {
      newErrors.location = 'Platsen måste vara minst 5 tecken lång'
      hasErrors = true
    }
    if (formData.job_description.length < 5) {
      newErrors.job_description =
        'Jobbbeskrivningen måste vara minst 5 tecken lång'
      hasErrors = true
    }
    const phoneNumberPattern = /^\d+$/
    if (!phoneNumberPattern.test(formData.phone_number ?? '')) {
      newErrors.phone_number = 'Telefonnumret får endast innehålla siffror'
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

  if (!isOpen) return null

  return (
    <ModalBackground>
      <ModalContent>
        <StyledForm id="jobForm" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="job_post_title">Jobbtitel:</Label>
            <Input
              type="text"
              id="job_post_title"
              name="job_post_title"
              value={formData.job_post_title}
              onChange={handleChange}
              maxLength={50}
            />
            {errors.job_post_title && <Span>{errors.job_post_title}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company_name">Företagsnamn:</Label>
            <Input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              maxLength={50}
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
              maxLength={10}
            />
            {errors.phone_number && <Span>{errors.phone_number}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="location">Plats:</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength={50}
            />
            {errors.location && <Span>{errors.location}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job_description">Beskrivning:</Label>
            <TextArea
              id="job_description"
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              maxLength={1000}
            />
            {errors.job_description && <Span>{errors.job_description}</Span>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="employment_type">Anställningstyp:</Label>
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
          <ButtonGroup>
            <CancelButton type="button" onClick={handleClose}>
              Avbryt
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export default JobForm
