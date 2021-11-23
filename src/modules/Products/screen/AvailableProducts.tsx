import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { Search, SentimentDissatisfied, SentimentDissatisfiedOutlined } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import NotFound from '../../../components/Common/NotFound';
import CartIcon from '../../../components/Icons/CartIcon';
import { capitalizeFirstLetter } from '../../../shared/helper/common';
import { ListParams } from '../../../shared/model';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Cart from '../../Cart/screen/Cart';
import ProductItem from '../component/ProductItem';
import Widget from '../component/Widget';
import { mealActions } from '../productSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'right',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  button: {
    position: 'fixed',
    cursor: 'pointer',
    font: 'inherit',
    border: 'none',
    backgroundColor: '#3f51b5',
    color: 'white',
    justifyContent: 'around',
    alignItems: 'center',
    borderRadius: '25px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#2c0d00',
    },
    '&:active': {
      backgroundColor: '#2c0d00',
    },
  },

  badge: {
    backgroundColor: '#b94517',
    padding: '0.50rem 1rem',
    borderRadius: '20px',
    marginLeft: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#2c0d00',
    },
    '&:active': {
      backgroundColor: '#2c0d00',
    },
  },
  icon: {
    width: '1.35rem',
    height: '1.35rem',
    marginRight: '0.5rem',
  },
  bump: {
    animation: '$bump 300ms ease-out',
  },
  '@keyframes bump': {
    '0%': {
      transform: 'scale(1)',
    },
    '10%': {
      transform: 'scale(0.9)',
    },
    '30%': {
      transform: 'scale(1.1)',
    },
    '50%': {
      transform: 'scale(1.15)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  icons: {
    textAlign: 'center',
  },
}));

const sortProducts = (products, ascending) => {
  const items = [...products];
  return items.sort((productA, productB) => {
    if (ascending) {
      return productA.id > productB.id ? 1 : -1;
    } else {
      return productA.id < productB.id ? 1 : -1;
    }
  });
};

const AvailableProducts = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart);
  const [cartIsShow, setCartIsShow] = useState(false);

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';

  const searchRef = useRef<HTMLInputElement>();

  const numberOfCartItems = cartItems.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(mealActions.fetchFoodOrderRequest(productsState.filter));
  }, [dispatch, productsState.filter]);

  const sortedProducts = sortProducts(productsState.list, isSortingAscending);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartItems.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems.items]);

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ListParams = {
      ...productsState.filter,
      startAt: `"${capitalizeFirstLetter(e.target.value)}"`,
    };
    dispatch(mealActions.setFilterWithDebounce(newFilter));
  };

  const handleClearFilter = () => {
    const newFilter: ListParams = {
      ...productsState.filter,
      orderBy: `"name"`,
      startAt: undefined,
    };
    dispatch(mealActions.setFilterWithDebounce(newFilter));

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box className={classes.root}>
      {/* Loading*/}
      {productsState.loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer} mt={5}>
        {cartIsShow && <Cart onClose={hideCartHandler} />}
        <Button className={btnClasses} onClick={showCartHandler}>
          <Typography className={classes.icon}>
            <CartIcon />
          </Typography>
          <Typography component={'span'} variant={'body2'}>
            Your Cart
          </Typography>
          <Typography className={classes.badge}>{numberOfCartItems}</Typography>
        </Button>
      </Box>

      <Box mt={5}>
        <Typography variant="h4">Menu Food</Typography>

        {/* Filter */}
        <Box mt={3}>
          <Grid container spacing={3}>
            {/* Search Product Name */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                <OutlinedInput
                  id="searchByName"
                  label="Search by name"
                  endAdornment={<Search />}
                  defaultValue={productsState.filter.startAt}
                  onChange={handleSearchChange}
                  inputRef={searchRef}
                />
              </FormControl>
            </Grid>

            {/* Sort */}
            <Grid item xs={12} md={6} lg={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <Button variant="outlined" color="primary" onClick={changeSortingHandler}>
                  Sort {isSortingAscending ? 'Descending' : 'Ascending'}
                </Button>
              </FormControl>
            </Grid>

            {/* Clear Filter */}
            <Grid item xs={12} md={6} lg={1}>
              <Button variant="outlined" color="primary" onClick={handleClearFilter} fullWidth>
                {' '}
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* List Products */}
        <Box mt={2}>
          <Grid container spacing={3}>
            {sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
              <Grid key={product.id} item xs={12} md={6} lg={3}>
                <Widget title={product.name}>
                  <ProductItem product={product} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pagination */}
        <Box my={2} display="flex" justifyContent="center">
          <Pagination
            color="secondary"
            count={Math.ceil(sortedProducts.length / itemsPerPage)}
            page={page}
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableProducts;
