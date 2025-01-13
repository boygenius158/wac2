import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ name, value, onChange, label, placeholder, error, ...rest }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
        {...rest}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputField;
