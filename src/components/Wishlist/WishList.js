import React, { useEffect,useState } from 'react'
import { useCart } from '../../context/CartContext';
import "../../css/CheckoutCart.css";
import "../../css/WishList.css";
import {Wish} from "../../components";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';

function WishList() {
    const [{wishlist}]=useCart();
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const {userData}=useAuth();
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        (async function(){
            try{
                setLoading(true)
                const response=await axios.get(`https://4476efe4-fb5e-4281-8701-eb43a60b186d.id.repl.co/wishlists/${userData?._id}`)
                dispatch({
                    type: "GET_WISHLIST_ITEMS",
                    payload: response.data.wishlistItems
                  });
                  setLoading(false)
            }
            catch(err){
                setLoading(false)
                console.log(err)
            }
        })()
        //eslint-disable-next-line
    },[])
    return(
        <>
        {loading?
            <div className="loader">
            <Loader type="ThreeDots" color="#fc452e" height={80} width={80} />
        </div>:
            (<div>
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
        </div>)}
        </>
    )
}
export default WishList


        
