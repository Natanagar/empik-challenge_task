import axios from 'axios';

export interface ProductInfo {
  pid: string;
  name: string;
  price: string;
  max: number;
  min: number;
  isBlocked: boolean;
}
const getCart = async () => {
  const requestCart = await axios.get('./api/cart');
  return requestCart.data;
};
export default getCart;
