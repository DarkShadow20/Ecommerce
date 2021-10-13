import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'
import "../../css/CheckoutCart.css";


function CheckoutCart({item}) {
    //eslint-disable-next-line
    const [state,dispatch]=useCart();
    const {userData}=useAuth();
    const removeFromCart=async ()=>{
        try{
            const response=await axios.post(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`,{_id:item.id,action:"MOVE"})
            if(response.status===201){
                console.log("Deleted successfully")
            }
        }catch(err){
            console.log(err)
        }
        dispatch({
            type:'REMOVE_FROM_CART',
            id:item.id
        })
    }
    const addQuantity= async ()=>{
        try{
            const response=await axios.post(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`,{_id:item.id,action:"ADD"})
            if(response.status===201){
                console.log("Updated quantity")
            }
        }catch(err){
            console.log(err)
        }
        dispatch({
            type:'ADD_QUANTITY',
            id:item.id
        })
    }
    const subtractQuantity = async () => {
        try{
            const response=await axios.post(`https://Ecom.kunalgupta9.repl.co/cart/${userData?._id}`,{_id:item.id,action:"REMOVE"})
            if(response.status===201){
                console.log("Updated quantity")
            }
        }catch(err){
            console.log(err)
        }
        dispatch( {
          type: 'SUB_QUANTITY',
          id:item.id,
        })
      };
    return (
            <div className="cards">
                <div className="img-header">
                    <img className="card-img-top" src={item.image} alt="Card img cap"/> 
                </div>
            <div className="card-body" >
                <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                        <div className="product__rating">
                        {
                            Array(item.rating).fill().map((_)=>(
                                <p>⭐</p>
                            ))
                        }
                        </div>
                    </p>
                <span>
                    <span className="strong-element">Rs.{item.price}</span>
                </span>
                <div className="checkoutCart-quantity">
                    <button className="btn btn-primary" onClick={addQuantity} >+</button>
                     <span className="quantity">{item.quantity}</span>
                {item.quantity>1 ? <button className="btn btn-primary" onClick={subtractQuantity} >-</button>:<button className="btn btn-primary" onClick={removeFromCart}><i className="fa fa-trash"></i></button>}
                 </div>
                 <button className="btn btn-primary" onClick={removeFromCart}>Remove From Cart</button>
             </div>
        </div>
    )
}

export default CheckoutCart
