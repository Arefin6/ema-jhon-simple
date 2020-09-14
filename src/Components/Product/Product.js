import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div className="img-part">
             <img src={img} alt=""/>
            </div>
            <div className="details-part">
            <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
            
            <p><small>by:<span className="price">{seller}</span></small></p>
            
            <p className="price">${price}</p>

              <p><small>Only {stock} left in stock Hurry Up!</small></p>
              {props.showAddToCart &&<button className="cart-btn" onClick={()=> props.handleAddProduct (props.product)}>
               <FontAwesomeIcon className="cart-icon" icon={faShoppingCart}/> Add To Cart</button>
              }
              
            </div>
          
        </div>
    );
};

export default Product;