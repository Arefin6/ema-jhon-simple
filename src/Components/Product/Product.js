import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {img,name,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div className="img-part">
             <img src={img} alt=""/>
            </div>
            <div className="details-part">
            <h4 className="product-name">{name}</h4>
            
            <p><small>by:<span className="price">{seller}</span></small></p>
            
            <p className="price">${price}</p>

              <p><small>Only {stock} left in stock Hurry Up!</small></p>
              <button className="cart-btn" onClick={()=> props.handleAddProduct (props.product)}>
                  <FontAwesomeIcon className="cart-icon" icon={faShoppingCart}/> Add To Cart</button>
            </div>
          
        </div>
    );
};

export default Product;