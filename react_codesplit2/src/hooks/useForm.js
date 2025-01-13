import { useState } from 'react'
import useToast from './Toast/useToast'

const useForm = (initialData) => {
  const [details, setDetails] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const { showSuccess } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    let error = ''

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = `${name.replace(/([A-Z])/g, ' $1')} can only contain letters and spaces.`
        }
        break

      case 'street':
      case 'city':
        if (value.trim() === '') {
          error = `${name.replace(/([A-Z])/g, ' $1')} cannot be empty.`
        }
        break

      case 'pincode':
        if (!/^\d{0,6}$/.test(value)) {
          error = 'Pincode must be a 6-digit number.'
        } else if (value.length > 6) {
          error = 'Pincode can only be 6 digits.'
        }
        break

      default:
        break
    }

    setDetails((prev) => ({
      ...prev,
      [name]: name === 'pincode' ? value.replace(/[^0-9]/g, '') : value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedDistrict('')
    setDetails((prev) => ({
      ...prev,
      state: e.target.value,
    }))
  }

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value)
    setDetails((prev) => ({
      ...prev,
      district: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    Object.keys(details).forEach((key) => {
      if (['firstName', 'lastName', 'street', 'city', 'pincode'].includes(key) && details[key].trim() === '') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`
      }

      if (['firstName', 'lastName'].includes(key) && !/^[a-zA-Z\s]*$/.test(details[key])) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} can only contain letters and spaces.`
      }
    })

    if (details.pincode && details.pincode.length !== 6) {
      newErrors.pincode = 'Pincode must be a 6-digit number.'
    }

    if (!selectedState) {
      newErrors.state = 'State is required.'
    }

    if (!selectedDistrict) {
      newErrors.district = 'District is required.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Details:', details)
      console.log('Selected State:', selectedState)
      console.log('Selected District:', selectedDistrict)
      showSuccess("Your response has been recorded.")
    }
  }

  return {
    details,
    errors,
    selectedState,
    selectedDistrict,
    handleChange,
    handleStateChange,
    handleDistrictChange,
    handleSubmit,
  }
}

export default useForm
