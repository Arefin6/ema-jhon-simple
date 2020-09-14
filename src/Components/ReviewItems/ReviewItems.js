import React from 'react';
import './ReviewItem.css';
import Cart from '../Cart/Cart';

const ReviewItems = (props) => {
    const{name,quantity,key,price} = props.cart;
    return (
        <div>
            <h4 className="product-name">{name}</h4> 
            <p>Quantity: {quantity} </p>
           <p className="price"><small>$ {price}</small></p>
           <br/>
           <button className="remove-btn"
           onClick={()=>props.removeProduct(key)}
           >Remove</button>
        </div>
    );
};

export default ReviewItems;