import axios from 'axios';

const putProductById = async (id: string) => {
  const requestCart = await axios.put(`./api/addProduct/${id}`);
  return requestCart.data;
};
export default putProductById;
