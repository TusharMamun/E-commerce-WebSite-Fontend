import ProductList from '@/Component/ProductList';
import Banner from '@/Component/SheardComponent/Banner';
import { getData } from '@/Helpers';
import React from 'react';

const Home = async () => {
  const endpoint = "http://localhost:5000/api/v1/products";

  const response = await getData(endpoint);

  const products = response.data; // ✅ FIXED


  return (
    <>
      <Banner />
      <ProductList products={products} />
    </>
  );
};

export default Home;