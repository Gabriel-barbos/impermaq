// src/api.js
export const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error('Failed em consultar API');
    }
    return await response.json();
  };
  
  export const fetchAdminData = async () => {
    const response = await fetch('http://localhost:3000/api/admin');
    if (!response.ok) {
      throw new Error('Failed to fetch admin data');
    }
    return await response.json();
  };