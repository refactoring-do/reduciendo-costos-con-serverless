import axios from "axios";
import API from "./config";

export const deleteProductApi = async (product) => {
  await axios.delete(`${window.location.origin}/${API}/products/${product.id}`);

  return true;
};

export const updateProductApi = async (product) => {
  await axios.put(
    `${window.location.origin}/${API}/products/${product.id}`,
    product
  );

  return product;
};

export const addProductApi = async (product) => {
  console.log(axios);
  const { data } = await axios.post(
    `${window.location.origin}/${API}/products`,
    product
  );

  return data.data;
};

export const loadProductsApi = async () => {
  const { data } = await axios.get(`${window.location.origin}/${API}/products`);

  return data.data;
};
