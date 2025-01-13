import { useState } from 'react'
import useToast from './Toast/useToast'
import { validateName, validateRequired, validatePincode, validateStateAndDistrict, validateForm } from '../utils/validate'

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
        error = validateName(value, name)
        break

      case 'street':
      case 'city':
        error = validateRequired(value, name)
        break

      case 'pincode':
        error = validatePincode(value)
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
  
    const newErrors = validateForm(details, selectedState, selectedDistrict)
    setErrors(newErrors)
  
    if (Object.keys(newErrors).length === 0) {
      // Show success message
      showSuccess("Your response has been recorded.")
  
      // Clear the fields
      setDetails({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        pincode: '',
      })
      setSelectedState('')
      setSelectedDistrict('')
      setErrors({})
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
