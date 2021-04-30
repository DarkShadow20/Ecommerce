import React from 'react'
import { useCart } from '../context/CartContext'
import "../css/ProductList.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ProductList({id,name,price,image,quantity,rating,inStock,fastDelivery,category}) {
    const [state,dispatch]=useCart();
    const addToBasket=async ()=>{
        try{
            const existedProduct=state.cart.find((product)=>product.id===id)
            if(existedProduct){
                const response=await axios.post(`https://Ecommerce.kunalgupta9.repl.co/cart/${id}`,{quantity:existedProduct.quantity+1})
                if(response.status===201){
                    console.log("did it quantity update")
                }
            }else{
            const response= await axios.post("https://Ecommerce.kunalgupta9.repl.co/cart",{
                id:id,name:name,price:price,image:image,quantity:quantity,rating:rating,inStock:inStock,fastDelivery:fastDelivery})
                if(response.status===201){
                    console.log("did it")
                }
            }
        }catch(err){
            console.log(err)
        }
        dispatch({
            type:'ADD_TO_CART',
            item:{
                id,
                name,
                price,
                image,
                quantity,
                rating
            }
        })
        
    };
    const addToWishlist=async ()=>{
        try{
            const response= await axios.post("https://Ecommerce.kunalgupta9.repl.co/wishlist",{
                id:id,name:name,price:price,image:image,quantity:quantity,rating:rating,inStock:inStock,fastDelivery:fastDelivery})
            if(response.status===201){
                console.log("Post req done")
            }
        }catch(err){
            console.log("Soory",err)
        }
        dispatch({
            type:'ADD_TO_WISHLIST',
            payload:{
                id,
                name,
                price,
                image,
                quantity,
                rating,
                inStock,
                fastDelivery
            }
        })
    }
    const notifyForCart=()=>{toast.success("Added To Cart",{position:toast.POSITION.BOTTOM_RIGHT})}
    const notifyForWishlist=()=>{toast.success("Added to Wishlist",{position:toast.POSITION.BOTTOM_RIGHT})}
    const notifyForRemovalWishlist=()=>{toast.info("Removed from wishlist",{position:toast.POSITION.BOTTOM_RIGHT})}
    const removefromWishList=()=>{
        dispatch({
            type:'TOGGLE_REMOVE_FROM_WISHLIST',
            payload:id
        })
    }
    return (
        <>
        <div className="card-collection-wrapper">
	        <div className="card" >
                <div className="img-header">
                    <img className="card-img-top" src={image} alt="Card img cap" style={!inStock?{opacity:0.1}:{opacity:1}}/> 
                </div>
                {!inStock && <span className="out-of-stock-overlay">Out of Stock</span>}
            <div className="card-body" >
                <h5 className="card-title">{name}{category}</h5>
                    <p className="card-text">
                        <span className="product__rating">
                        {
                            Array(rating).fill().map((_)=>(
                                <p>⭐</p>
                            ))
                        }
                        </span>
                    </p>
                <span>
                    <span className="strong-element">Rs.{price}</span>
                </span>
                <div className="btn-toast">
                    <button className="btn btn-primary" onClick={()=>{
                        addToBasket();
                        notifyForCart();}} disabled={!inStock} style={!inStock?{opacity:0.1}:{opacity:1}}>Add to Cart</button> 
                    <ToastContainer/>
                </div>
            {state.wishlist.find((items)=>items.id===id)?(<button className="btn btn-primary" onClick={()=>{removefromWishList();notifyForRemovalWishlist()}}>Remove from Wishlist</button>):(<button className="btn btn-primary" onClick={()=>{addToWishlist();notifyForWishlist();}}>Add to Wishlist</button>)}
            </div>
            </div>
        </div>

        </>
    )
}

export default ProductList
