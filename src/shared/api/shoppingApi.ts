import { CartItem, ListParams, Products } from '../model';
import axiosClient from './axiosClient';

const shoppingApi = {
  getAll(params: ListParams): Promise<Products> {
    const url = '/products.json';
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Products> {
    const url = `/products/${id}.json`;
    return axiosClient.get(url);
  },
  addProduct(data: Products): Promise<Products> {
    const url = '/products.json';
    return axiosClient.post(url, data);
  },
  updateProduct(data: Partial<Products>): Promise<Products> {
    const url = `/products/${data.id}.json`;
    return axiosClient.put(url, data);
  },
  removeProduct(id: string): Promise<any> {
    const url = `/products/${id}.json`;
    return axiosClient.delete(url);
  },
};

export default shoppingApi;
