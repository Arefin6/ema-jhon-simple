import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const savedCart = getDatabaseCart();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
       const orderDetails = {...loggedInUser,product:savedCart,shipment:data,orderTime:new Date()};
         
       fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
       if(data){
         processOrder();
         alert("product ready!!");
       }
    })
        
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error" >This field is required</span>}
        
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">This field is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.address && <span className="error">This field is required</span>}

        <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
        {errors.phone && <span className="error">This field is required</span>}

    
        <input type="submit" />
      </form>
    );
};

export default Shipment;