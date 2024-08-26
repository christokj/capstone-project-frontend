import React from 'react'
import { useLocation } from 'react-router-dom';
import ShowProducts from '../../components/Product/ShowProducts';

function ProductByCategory() {

    const location = useLocation();
    const data = location.state;

  return (
    <div>
        <ShowProducts id={data}/>
    </div>
  )
}

export default ProductByCategory;