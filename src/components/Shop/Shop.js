import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    //This useEffect() is used to load data from mongodb database
    useEffect(() => {
        fetch('https://floating-cove-45088.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    //Same like Review.js
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        fetch('https://floating-cove-45088.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);

        let count = 1;
        let newCart;
        if (sameProduct) {
            const toBeAddedKey = product.key;
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='main-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;