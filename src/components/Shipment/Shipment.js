import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

        fetch('https://floating-cove-45088.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(orderDetails)
        })
         .then(res => res.json())
         .then(data => {
             if(data){
                processOrder(); 
                alert('Your order placed successfully');
             }
         });
    };

    console.log(watch("example")); // watch input value by passing the name of it
    
    // "handleSubmit" will validate your inputs before invoking "onSubmit"

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            register your input into the hook by invoking the "register" function

            {/* include validation with required or other standard HTML validation rules */}
            <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder='Your Name' />
            {/* errors will return when field validation fails  */}
            {errors.name && <span className='error'>Name is required</span>}
            
            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
            {errors.email && <span className='error'>Email is required</span>}
            
            <input name="address" ref={register({ required: true })} placeholder='Your Address' />
            {errors.address && <span className='error'>Address is required</span>}
            
            <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
            {errors.phone && <span className='error'>Phone number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;