import { CircularProgress } from '@material-ui/core';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../../components/Modal/Modal';
import orderApi from '../../../shared/api/orderApi';
import { CartItem } from '../../../shared/model';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { cartActions } from '../cart-slice';
import CartItems from '../component/CartItem';
import classes from './Cart.module.css';
import CheckoutForm from './checkoutForm';

const Cart = (props) => {
  const cartState: any = useAppSelector((state) => state.cart);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const { items, totalAmount } = cartState;

  const totalPrice = `${Number(totalAmount).toFixed(2)}`;

  const hasItems = items.length > 0;

  const dispatch = useAppDispatch();

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const removeItemHandler = (id: string) => {
    dispatch(cartActions.removeCartSuccess(id));
  };

  const addItemHandler = (item: CartItem) => {
    dispatch(cartActions.addCartSuccess({ ...item, quantity: 1 }));
  };
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const submitOrderHandler = async (userData) => {
    const body = {
      user: userData,
      orderedItems: items,
    };
    if (!isLoggedIn) {
      toast.error('Vui lòng login user!!!');
      return;
    }
    setIsSubmitting(true);
    await orderApi.orderProduct(body);
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart({}));
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItems
          key={item.id}
          cartItem={item}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalPrice}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onSubmit={submitOrderHandler} onCancel={() => setIsCheckout(false)} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isLoggedIn && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
