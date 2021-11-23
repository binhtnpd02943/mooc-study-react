export interface Products {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: boolean;
}
