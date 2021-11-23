import { CartItem } from '../model';
import axiosClient from './axiosClient';

const cartApi = {
  addCart(data: any): Promise<any> {
    const url = '/cart.json';
    return axiosClient.post(url, data);
  },
  getCartId(id: string): Promise<CartItem> {
    const url = `/cart/${id}.json`;;
    return axiosClient.get(url);
  },
};

export default cartApi;
