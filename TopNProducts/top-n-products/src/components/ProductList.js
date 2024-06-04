import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Top N Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.productName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
