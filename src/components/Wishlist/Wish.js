import React from 'react'
import "../../css/WishList.css";
import { useCart } from '../../context/CartContext'
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

function Wish({items}) {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const {userData}=useAuth();
    const addToBasket=async ()=>{
        try{
            const existedProduct=state.cart.find((product)=>product.id===items.id)
            if(existedProduct){
                const response=await axios.post(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`,{_id:items.id,action:"ADD"})
                if(response.status===200){
                    await axios.post(`https://Ecom.kunalgupta9.repl.co/wishlists/${userData?._id}`,{_id:items.id})
                }
            }else{
            const response= await axios.post(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`,{_id:items.id,action:"ADD"})
                if(response.status===201){
                    await axios.post(`https://Ecom.kunalgupta9.repl.co/wishlists/${userData?._id}`,{_id:items.id})
                }
            }
        }catch(err){
            console.log(err)
        }
        dispatch({
            type:'MOVE_TO_CART',
            payload:items.id
        })
    };
    const removefromWishList=async ()=>{
        try{
            const response= await axios.post(`https://Ecom.kunalgupta9.repl.co/wishlists/${userData?._id}`,{_id:items.id})
            if(response.status===200){
                console.log("Delete req done successfully",response)
            }
        }catch(err){
            console.log(err)
        }
        dispatch({
            type:'REMOVE_FROM_WISHLIST',
            id:items.id
        })
    }
    return (
        <div className="card" >
        <div className="img-header">
            <img className="card-img-top" src={items.image} alt="Card img cap" style={!items.inStock?{opacity:0.1}:{opacity:1}}/>
            <button className="card-close close" data-dismiss="modal" aria-label="Close"  onClick={removefromWishList}><span aria-hidden="true">&times;</span></button> 
        </div>
        {!items.inStock && <span className="out-of-stock-overlay">Out of Stock</span>}
        <div className="card-body">
            <h5 className="card-title">{items.name}</h5>
            <p className="card-text">
                <div className="checkoutCart_rating">
                    {
                        Array(items.rating).fill().map((_)=>(
                            <p>⭐</p>
                        ))
                    }
                </div>
            <span>
                <span className="strong-element">Rs.{items.price}</span>
            </span>
            </p>
            <button onClick={addToBasket} className="btn btn-primary" disabled={!items.inStock} style={!items.inStock?{opacity:0.2}:{opacity:1}}>Add to Cart</button>   
        </div>
        </div>
    )
}

export default Wish


