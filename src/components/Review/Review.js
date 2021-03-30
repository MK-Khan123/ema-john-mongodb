import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false); //This state is declared to handle the image that will pop up when we click 'Place Order' button
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey); //To remove from local storage.
    }
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

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />;
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;