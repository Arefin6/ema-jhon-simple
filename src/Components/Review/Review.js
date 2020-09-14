import React from 'react';
import './Review.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

    const[cart,setCart]=useState([]);
    const[placeOrder,setPlaceOrder]=useState(false); 

    useEffect(()=>{

     const savedCart = getDatabaseCart();
     const productKeys = Object.keys(savedCart);
     
      const cartProducts = productKeys.map(key =>{
           
          const product = fakeData.find(pd=>pd.key === key);
          product.quantity = savedCart[key];
          return product; 
      });
      setCart(cartProducts);

    },[]);
     const history = useHistory();
    const handleCheckout = () =>{
        history.push('/shipment');
    }
     const removeProduct = (productKey)=>{
        //   console.log("remove korse haramjada");
        const newCart = cart.filter(pd=>pd.key != productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
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