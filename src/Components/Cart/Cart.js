import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total =cart.reduce((total,pd) =>total + pd.price,0);
    return (
        <div>
            <h2>Order Summery</h2>
            <p>items:{cart.length}</p>
             <p>Total Price:{total}</p>
        </div>
    );
};

export default Cart;