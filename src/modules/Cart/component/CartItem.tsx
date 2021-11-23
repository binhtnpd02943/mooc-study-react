import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import React from 'react';
import { CartItem } from '../../../shared/model';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #8a2b06',
    padding: '1rem 0',
    margin: '1rem 0',
  },
  summary: {
    width: '10rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    color: '#8a2b06',
  },
  amount: {
    fontWeight: 'bold',
    border: '1px solid #ccc',
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    color: '#363636',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: '1rem 0',
  },
  actions: {
    display: ' flex',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
  button: {
    font: 'inherit',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#8a2b06',
    border: '1px solid #8a2b06',
    width: '3rem',
    textAlign: 'center',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    marginLeft: '1rem',
    margin: '0.25rem',
    '&:hover': {
      backgroundColor: '#8a2b06',
      color: 'white',
    },
    '&:active': {
      backgroundColor: '#8a2b06',
      color: 'white',
    },
  },
  cartName: {
    margin: '0 0 0.5rem 0',
    color: '#363636',
  },
}));

export interface CartItemsProps {
  cartItem: CartItem;
  onAdd: (item) => void;
  onRemove: (id) => void;
}

export default function CartItems({ cartItem, onAdd, onRemove }: CartItemsProps) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <List>
        <ListItem className={classes.cartItem}>
          <Box>
            <Typography variant="h4" className={classes.cartName}>
              {cartItem.name}
            </Typography>
            <Box className={classes.summary}>
              <ListItemText className={classes.price} primary={`$${Number(cartItem.price).toFixed(2)}`} />
              <ListItemText className={classes.amount} primary={`x ${Number(cartItem.quantity).toFixed(2)}`} />
            </Box>
          </Box>
          <Box className={classes.actions}>
            <Button size="small" className={classes.button} onClick={onRemove}>
              -
            </Button>
            <Button size="small" className={classes.button} onClick={onAdd}>
              +
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}
