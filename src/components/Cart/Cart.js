import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    
    const total = cart.reduce((total, prd) => formatNumber(total + prd.price * prd.quantity), 0);

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = formatNumber(total * 0.1);
    
    const grandTotal = formatNumber(total + shipping + tax);
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: ${total}</p>
            <p><small>Shipping cost: ${shipping}</small></p>
            <p><small>Tax + VAT: ${tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;