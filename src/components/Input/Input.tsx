import React, { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';


export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return (
    <div className={classes.input}>
      <label>{props.label}</label>
      <input ref={ref} {...props} type="number" min="1" max="5" defaultValue="1" step="1" />
    </div>
  );
});

export default InputField;
