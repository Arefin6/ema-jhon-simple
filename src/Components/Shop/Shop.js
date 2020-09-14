import React from 'react'; 
import  { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] =useState(first10);
    const [cart,setCarts] = useState([]);
   
    useEffect(()=>{
     const savedCart = getDatabaseCart();
     const productKeys = Object.keys(savedCart);
     const cartProducts = productKeys.map(key =>{
           
        const product = fakeData.find(pd=>pd.key === key);
        product.quantity = savedCart[key];
        return product; 
    });
    setCarts(cartProducts);

    },[]);

    const handleAddProduct = (product) =>{
        let count =1;
        let newCart;
        //  console.log("Product added",product);
        const sameProduct = cart.find(pd=>pd.key === product.key);
         if(sameProduct){
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count;
             const others = cart.filter(pd => pd.key !== product.key);
             newCart =[...others,sameProduct];
         }
         else{
             product.quantity = 1;
             newCart=[...cart,product];
         }
         setCarts(newCart);
         addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
           <div className="product-container">
             {
              products.map(product => <Product key={product.key} product={product}
              handleAddProduct = {handleAddProduct} showAddToCart={true}></Product>)
              }
           </div>
            <div className="cart-container">
                   <Cart cart ={cart}>
                   <Link to="/review">
                   <button className="cart-btn">Review Order</button>
                 </Link>
             </Cart>
            </div>
          
        </div>    
    );
};

export default Shop;