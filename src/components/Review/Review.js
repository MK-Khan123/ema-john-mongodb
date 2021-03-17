import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
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
        // console.log(newCart);
        setCart(newCart);
        removeFromDatabaseCart(productKey); //To remove from local storage.
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);
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