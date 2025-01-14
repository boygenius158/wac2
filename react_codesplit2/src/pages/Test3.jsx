import React, { useState } from 'react'
import { useForm, useField, Form, Debug, Relevant } from 'informed'
import Select from '../components/ui/informed/Select' // Import the Select component
import Input from '../components/ui/informed/Input'



const Test3 = () => {
  const selectOptions = [
    {
      state: 'Kerala',
      district: ['Ernakulam', 'Kottayam', 'Thrissur', 'Alappuzha'],
    },
    {
      state: 'Tamil Nadu',
      district: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    },
    {
      state: 'Karnataka',
      district: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    },
  ]

  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const allStates = selectOptions.map((e) => e.state)
  const filteredDistricts =
    selectOptions.find((e) => e.state === selectedState)?.district || []

  // Reusable validateOptions function
  const validateOptions = (value, fieldName) => {
    console.log(`${fieldName} selected:`, value)
    if (fieldName === 'State') {
      setSelectedState(value) // Update state for selected state
      setSelectedDistrict('') // Reset district when state changes
    } else if (fieldName === 'District') {
      setSelectedDistrict(value) // Update state for selected district
    }
  }

  function validateFirstName(value) {
    console.log("validateFirstName", value)

  }

  const onSubmit = ({ values }) => {
    console.log(values)
  }

  return (
    <Form onSubmit={onSubmit}>
     
      {/* Input for name */}
      <Input validateOn="change" name="name" validate={validateFirstName} required="add dynamic values here" />

      {/* Select for State */}
      <Select
        name="State"
        field="State"
        label="State"
        validate={(value) => validateOptions(value, 'State')}
        validateOn="change"
        required
      >
        <option value="" disabled>
          Select a state
        </option>
        {allStates.map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
      </Select>

      {/* Select for District */}
      <Relevant when={({ formState }) => formState.values.State}>
        <Select
          name="District"
          label="District"
          validate={(value) => validateOptions(value, 'District')}
          validateOn="change"
          required
        >
          <option value="" disabled>
            Select a district
          </option>
          {filteredDistricts.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </Select>
      </Relevant>

      <button type="submit">Submit</button>
      <Debug valid pristine dirty values errors touched />
    </Form>
  )
}

export default Test3
