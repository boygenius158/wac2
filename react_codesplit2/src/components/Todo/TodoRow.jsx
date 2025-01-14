import React, { useState } from 'react'
import ConfirmationModal from '../ConfirmationModal'
import useToast from '../../hooks/Toast/useToast'

export default function TodoRow({ todo, index, onRemove }) {
  const [showModal, setShowModal] = useState(false)
  const { showSuccess } = useToast()
  const handleShow = () => setShowModal(true)

  const handleClose = () => setShowModal(false)

  const handleDelete = () => {
    onRemove(todo._id)
    handleClose()
    showSuccess("You have successfully removed it.")
  }

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{todo.text}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={handleShow}>
            Delete
          </button>
        </td>
      </tr>

      {/* Use the ConfirmationModal component */}
      <ConfirmationModal
        show={showModal}
        onHide={handleClose}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this task?"
      />
    </>
  )
}
