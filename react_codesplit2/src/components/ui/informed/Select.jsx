import React from 'react';
import { useField } from 'informed';

const Select = props => {
  const { render, informed, userProps, ref } = useField({
    type: 'select',
    ...props
  });
  const { label, id, children, ...rest } = userProps;
  return render(
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={ref} {...informed} {...rest}>
        {children}
      </select>
    </>
  );
};

export default Select;
