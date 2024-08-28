import React from 'react'
import { useLocation } from 'react-router-dom';
import ShowProducts from '../../components/Product/ShowProducts';

function ProductByCategory({id}) {

    const location = useLocation();
    const data = location.state;
console.log(data)
console.log({id})
  return (
    <div>
        <ShowProducts id={data}/>
    </div>
  );
}

export default ProductByCategory;