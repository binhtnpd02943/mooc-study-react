import { Box, CircularProgress, makeStyles, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/FormFiekds/InputField';
import { Order } from '../../../shared/model';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneRegExp } from '../../../shared/helper/common';

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    margin: '1rem 0',
    height: '17rem',
    overflow: 'auto',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  button: {
    font: 'inherit',
    color: '#5a1a01',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '25px',
    padding: '0.5rem 2rem',
    '&:hover': {
      backgroundColor: '#ffe6dc',
    },
    '&:active': {
      backgroundColor: '#ffe6dc',
    },
  },
  submit: {
    border: '1px solid #5a1a01',
    backgroundColor: '#5a1a01',
    color: 'white',
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: '#7a2706',
    },
    '&:active': {
      backgroundColor: '#7a2706',
    },
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '20rem',
    maxWidth: '100%',
  },
}));

export interface CheckoutFormProps {
  onSubmit?: (formValues: Order) => void;
  onCancel?: () => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter a valid name!')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  phone: yup
    .string()
    .required('Please enter a valid phone!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  street: yup.string().required('Please enter a valid street!'),
  postal: yup
    .number()
    .test(
      'len',
      'Please enter a valid postal code (5 characters long)!',
      (value) => value?.toString().length === 5
    )
    .positive('Please enter a positive number.')
    .integer('Please enter an integer.')
    .required('Please enter postal code.')
    .typeError('Please enter a valid number.'),
  city: yup.string().required('Please enter a valid city!'),
});

export default function CheckoutForm({ onSubmit, onCancel }: CheckoutFormProps) {
  const classes = useStyles();
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Order>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Order) => {
    try {
      //Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={600}>
      <form className={classes.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Your Name" />

        <InputField name="phone" control={control} label="Phone"/>

        <InputField name="street" control={control} label="Street" />

        <InputField name="postal" control={control} label="Postal Code" type="number" />

        <InputField name="city" control={control} label="City" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3} className={classes.actions}>
          <Button type="button" onClick={onCancel} className={classes.button}>
            Cancel
          </Button>

          <Button type="submit" className={classes.submit} disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Confirm
          </Button>
        </Box>
      </form>
    </Box>
  );
}
