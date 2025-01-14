import React from 'react';
import { Form } from 'react-bootstrap';

const TextAreaField = ({ name, value, onChange, label, placeholder }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default TextAreaField;
