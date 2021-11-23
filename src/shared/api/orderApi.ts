import axiosClient from './axiosClient';

const orderApi = {
  orderProduct(data: any): Promise<any> {
    const url = '/order.json';
    return axiosClient.post(url, data);
  },
};

export default orderApi;
