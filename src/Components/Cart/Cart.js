import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total =cart.reduce((total,pd) =>total + pd.price,0);
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
          <h4 className="order-details">Order Summary</h4>
            <p>Items Ordered:<span className="price">  {cart.length}</span></p>
            <p>Product Price: <span className="price">  {formatNumber(total)}</span></p>
            <p><small>Shiping Cost: <span className="price">  {shipping}</span></small></p>
            <p><small>Tax + VAT: <span className="price">  {tax}</span></small></p>
            <p>Total Price: <span className="price">  {grandTotal}</span></p>
        </div>
    );
};

export default Cart;