import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=100");
    console.log(response.data.products);
    
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
}
