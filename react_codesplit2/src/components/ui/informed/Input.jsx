import React from 'react';
import { useField } from 'informed';

const Input = (props) => {
  const { render, informed } = useField({
    type: 'text',
    ...props,
  });
  return render(<input {...informed} />);
};

export default Input;
