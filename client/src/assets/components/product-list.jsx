import '../styles/product-list.css'
import ProductCard from './product-card';
import  { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';

const ProductList = () => {

const [produtos, setProdutos] = useState([]);


useEffect(() => {
  ProductService.getProdutos()
    .then(response => {
      setProdutos(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar produtos:', error);
    });
}, []);


  <div className="space-align-container">
  
  {produtos.map(produto => (
        <ProductCard key={produto._id} produto={produto} />
      ))}

  </div>
};
export default ProductList;