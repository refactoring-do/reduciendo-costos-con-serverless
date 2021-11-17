import axios from "axios";
import API from "./config";

const captains = console;

export const deleteProductApi = async (product) => {
  await axios.delete(`${API}/products/${product.id}`);

  return true;
};

export const updateProductApi = async (product) => {
  await axios.put(`${API}/products/${product.id}`, product);

  return product;
};

export const addProductApi = async (product) => {
  console.log(axios);
  const { data } = await axios.post(`${API}/products`, product);

  return data.data;
};

export const loadProductsApi = async () => {
  const { data } = await axios.get(`${API}/products`);

  console.log(data.data);

  return data.data;
};
