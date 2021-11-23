import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/FormFiekds/InputField';
import { Products } from '../../../shared/model';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface ProductFormProps {
  initialValues?: Products;
  onSubmit?: (formValues: Products) => void;
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
  price: yup
    .number()
    .min(1, 'Min is 1')
    .positive('Please enter a price number.')
    .integer('Please enter an integer.')
    .required('Please enter price.')
    .typeError('Please enter a valid number.'),
  quantity: yup
    .number()
    .min(1, 'Min is 1')
    .positive('Please enter a quantity number.')
    .integer('Please enter an integer.')
    .required('Please enter quantity.')
    .typeError('Please enter a valid number.'),
  description: yup.string().required('Please enter a valid description!'),
});

export default function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const [error, setError] = React.useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Products>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handlerFormSubmit = async (formValues: Products) => {
    try {
      //Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handlerFormSubmit)}>
        {/* Form Fields */}
        <InputField name="name" control={control} label="Product Name" />

        <InputField name="price" control={control} label="Price" type="number" />

        <InputField name="quantity" control={control} label="Quantity" type="number" />

        <InputField name="description" control={control} label="Description" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />} &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
