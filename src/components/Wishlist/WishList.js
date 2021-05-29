import React, { useEffect } from 'react'
import { useCart } from '../../context/CartContext';
import "../../css/CheckoutCart.css";
import "../../css/WishList.css";
import {Wish} from "../../components";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function WishList() {
    const [{wishlist}]=useCart();
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const {userData}=useAuth();
    useEffect(()=>{
        (async function(){
            try{
                const response=await axios.get(`https://Ecom.kunalgupta9.repl.co/wishlists/${userData?._id}`)
                dispatch({
                    type: "GET_WISHLIST_ITEMS",
                    payload: response.data.wishlistItems
                  });
            }
            catch(err){
                console.log(err)
            }
        })()
        //eslint-disable-next-line
    },[])
    return(
        <div>
            {wishlist?.length===0?(
                <div>
                    <h2>Your WishList is empty</h2>
                    <p className="wish-empty-text">You have no items in your Wishlist.</p>
                </div>

            ):(
                <>
                    <h2>Your WishList</h2>
                    <div className="card-collection-wrapper">
                    {wishlist.map((items)=>(
                            <Wish items={items}/>
                    ))}
                    </div>
                </>
            )}
        </div>
    )
}
export default WishList


        
