import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductSearch() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (isAuthenticated) {

                navigate('/user/products', { state: { searchValue } });
            } else {
                navigate('/products', { state: { searchValue } });
            }
        }
    };

    return (
        <input
            type="text"
            value={searchValue}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Search for products"
            className="hidden lg:block input bg-slate-50 input-bordered w-32 md:w-44 md:h-10"
        />
    );
}

export default ProductSearch;
