// validation.js
export const validateName = (value, name) => {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return `${name.replace(/([A-Z])/g, ' $1')} can only contain letters and spaces.`;
    }
    return '';
  }
  
  export const validateRequired = (value, name) => {
    if (value.trim() === '') {
      return `${name.replace(/([A-Z])/g, ' $1')} cannot be empty.`;
    }
    return '';
  }
  
  export const validatePincode = (value) => {
    if (!/^\d{0,6}$/.test(value)) {
      return 'Pincode must be a 6-digit number.';
    } else if (value.length > 6) {
      return 'Pincode can only be 6 digits.';
    }
    return '';
  }
  
  export const validateStateAndDistrict = (state, district) => {
    const errors = {};
    if (!state) errors.state = 'State is required.';
    if (!district) errors.district = 'District is required.';
    return errors;
  }
  
  export const validateForm = (details, selectedState, selectedDistrict) => {
    const errors = {}
  
    // Required fields validation
    Object.keys(details).forEach((key) => {
      if (['firstName', 'lastName', 'street', 'city', 'pincode'].includes(key) && details[key].trim() === '') {
        errors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`
      }
    })
  
    // Name validation
    if (['firstName', 'lastName'].some(key => details[key] && !/^[a-zA-Z\s]*$/.test(details[key]))) {
      errors.firstName = 'First name can only contain letters and spaces.'
      errors.lastName = 'Last name can only contain letters and spaces.'
    }
  
    // Pincode validation
    if (details.pincode && details.pincode.length !== 6) {
      errors.pincode = 'Pincode must be a 6-digit number.'
    }
  
    // State and district validation
    const stateAndDistrictErrors = validateStateAndDistrict(selectedState, selectedDistrict)
    Object.assign(errors, stateAndDistrictErrors)
  
    return errors
  }
  