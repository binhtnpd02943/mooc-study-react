import { Box, formatMs, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import shoppingApi from '../../../../shared/api/shoppingApi';
import { Products } from '../../../../shared/model';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { productFormActions } from '../../adminSlice';
import ProductForm from '../../component/ProductForm';

export default function AddEditProduct() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const productFormState = useAppSelector((state) => state.productForm);
  const { productId } = useParams<{ productId: string }>();

  const isEdit = Boolean(productId);

  const [product, setProduct] = useState<Products>();

  useEffect(() => {
    //IIFE
    (async () => {
      try {
        const data: Products = await shoppingApi.getById(productId);
        setProduct(data);
      } catch (error) {
        console.log('Failed to fetch product details', error);
      }
    })();
  }, [productId]);

  const handleProductFormSubmit = (formValues: Products) => {
    const data: Products = {
      id: productId,
      name: formValues.name,
      price: formValues.price,
      quantity: formValues.quantity,
      description: formValues.description,
      status: true,
    };
    // TODO: Handle submit here, call API  to add/update product
    if (isEdit) {
      dispatch(productFormActions.editProductRequest(data));
    } else {
      dispatch(productFormActions.addProductRequest(formValues));
    }
    //Toast success
    toast.success('Save product successfully!');
  };

  //Redirect back to product list
  useEffect(() => {
    if (productFormState.isLeave) {
      dispatch(productFormActions.setIsLeave({ isLeave: false }));
      history.push('/admin/products');
    }
  }, [productFormState.isLeave]);

  const initialValues: Products = {
    name: '',
    price: '',
    quantity: '',
    description: '',
    status: false,
    ...product,
  } as Products;

  return (
    <Box>
      <Link to="/admin/products">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to product list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update product info' : 'Add new product'}</Typography>

      {(!isEdit || Boolean(product)) && (
        <Box mt={3}>
          <ProductForm initialValues={initialValues} onSubmit={handleProductFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
