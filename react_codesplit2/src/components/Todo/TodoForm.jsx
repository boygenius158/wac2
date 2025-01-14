import React, { useState } from 'react'
import validateForm from '../../utils/validateForm'
import useToast from '../../hooks/Toast/useToast'
export default function TodoForm({ onSubmit, initialData = {}, existingTask, loading }) {
  const [taskInput, setTaskInput] = useState(initialData.text || '')
  const [errorMessage, setErrorMessage] = useState('')
  const { showSuccess } = useToast()
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationResult = validateForm(taskInput, existingTask)

    if (validationResult.status === 'error') {
      setErrorMessage(validationResult.message)
    } else {
      setErrorMessage('')
      onSubmit({ taskInput })
      setTaskInput('')
      showSuccess("task added.")
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setTaskInput(value)

    // Reset error message when user starts typing
    if (errorMessage) {
      setErrorMessage('')
    }
  }
  
  return (
    <form
      className="d-flex flex-column align-items-center justify-content-center mb-3 mt-3"
      onSubmit={handleSubmit}
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <div className="w-100">
        <input
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          value={taskInput}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter your task"
        />
        {errorMessage && (
          <div className="invalid-feedback">{errorMessage}</div>
        )}
      </div>
      {loading ? 'Adding...' : (
        <button className="btn btn-primary mt-3" type="submit">
          Add
        </button>
      )}
    </form>
  )
}
