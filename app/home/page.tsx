"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");

        console.log("Fetched Data:", res.data);

        if (res.data.error) throw new Error(res.data.error);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image_url} alt={product.name} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
