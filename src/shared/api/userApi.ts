import axios from 'axios';
import { LoginPayload } from '../../modules/auth/auth-slice';

const http = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

const userApi = {
  login(data: LoginPayload): Promise<LoginPayload> {
    const url = '/accounts:signInWithPassword?key=AIzaSyDlFApmxH39ZRYqvRZGhQprpGPrT6STsgk';
    return http.post(url, data);
  },
  singUp(data: LoginPayload): Promise<LoginPayload> {
    const url = '/accounts:signUp?key=AIzaSyDlFApmxH39ZRYqvRZGhQprpGPrT6STsgk';
    return http.post(url, data);
  },
  updateUser(data: any): Promise<any> {
    const url = '/accounts:update?key=AIzaSyDlFApmxH39ZRYqvRZGhQprpGPrT6STsgk';
    return http.post(url, data);
  },
  getUser(data:any): Promise<any> {
    const url = '/accounts:lookup?key=AIzaSyDlFApmxH39ZRYqvRZGhQprpGPrT6STsgk';
    return http.post(url,data);
  },
};

export default userApi;
