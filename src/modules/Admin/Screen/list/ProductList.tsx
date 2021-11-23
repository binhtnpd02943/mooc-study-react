import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Products } from '../../../../shared/model';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { mealActions } from '../../../Products/productSlice';
import ProductTable from '../../component/ProductTable';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ProductList() {
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const productsState = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(mealActions.fetchFoodOrderRequest({}));
  }, [dispatch]);

  const handleEditProduct = async (product: Products) => {
    history.push(`${match.url}/${product.id}`);
  };

  const handlerRemoveProduct = (product: Products) => {
    dispatch(mealActions.deleteProductRequest({ id: product?.id || '' }));
  };

  return (
    <Box className={classes.root}>
      {/* Loading*/}
      {productsState.loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Products</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new Product
          </Button>
        </Link>
      </Box>

      <ProductTable
        productList={productsState.list}
        onEdit={handleEditProduct}
        onRemove={handlerRemoveProduct}
      />
    </Box>
  );
}
