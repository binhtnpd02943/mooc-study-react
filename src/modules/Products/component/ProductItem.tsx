import { Fragment } from 'react';
import { toast } from 'react-toastify';
import { Products } from '../../../shared/model';
import { useAppDispatch } from '../../../store/hooks';
import { cartActions } from '../../Cart/cart-slice';
import classes from './ProductItem.module.css';
import ProductItemForm from './ProductItemForm';

export interface ProductProps {
  product: Products;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const cartItemAddHandler = (quantity) => {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      status: false,
    };

    if (product.quantity === 0) {
      toast.warning(`Hiện tại sản phẩm "${product.name}" này đã hết hàng!!`);
      return;
    }

    dispatch(cartActions.addCartSuccess(data));
  };

  return (
    <Fragment>
      <li className={classes.meal} key={product.id}>
        <div>
          <h3>{product.name}</h3>
          <div className={classes.description}>{product.description}</div>
          <div className={classes.price}>${Number(product.price).toFixed(2)}</div>
        </div>
        <div>
          <ProductItemForm onAddToCart={cartItemAddHandler} />
        </div>
      </li>
    </Fragment>
  );
};

export default ProductItem;
