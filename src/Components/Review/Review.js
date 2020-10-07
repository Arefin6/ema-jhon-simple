import React from 'react';
import './Review.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const history = useHistory();
    const[cart,setCart]=useState([]);
    const[placeOrder,setPlaceOrder]=useState(false); 
    
    const handleCheckout = () =>{
        history.push('/shipment');
    }
     const removeProduct = (productKey)=>{
        //   console.log("remove korse haramjada");
        const newCart = cart.filter(pd=>pd.key != productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    }, []);

    //  let thankyou;
    //   if(placeOrder){
    //     thankyou = <img src={happyImg} alt=""/>
    //   }

    return (
        <div className="shop-container">
        <div className="product-container">
          <h1>Cart Item:{cart.length}</h1> 
           {cart.map(cart => <ReviewItems key={cart.key} removeProduct={removeProduct}  cart ={cart}></ReviewItems>)
            }
            {
             placeOrder && <img src={happyImg} alt=""/>
            }

        </div>   
        <div className="cart-container">
               <Cart cart={cart}>
                   <button  onClick={handleCheckout} className="cart-btn">Proceed Checkout</button>
               </Cart>
        </div>
        </div>
    );
};

export default Review;