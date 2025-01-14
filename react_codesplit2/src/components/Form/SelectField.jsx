import React from 'react';
import { Form } from 'react-bootstrap';

const SelectField = ({ name, value, onChange, options, label, error, disabled }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
        disabled={disabled}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default SelectField;
