
export const initialState={
    cart:[{brand: "quo",
    color: "lime",
    fastDelivery: false,
    id: "bb463b8b-b76c-4f6a-9726-65ab5730b69b",
    idealFor: "Girl",
    image: "http://placeimg.com/640/480/business",
    inStock: true,
    level: "advanced",
    material: "Granite",
    name: "Generic Concrete Table",
    offer: "Republic Day Sale",
    price: "84.00",
    quantity: 1,
    ratings: 2}],
    wishlist:[{brand: "quo",
    color: "lime",
    fastDelivery: false,
    id: "bb463b8b-b76c-4f6a-9726-65ab5730b69b",
    idealFor: "Girl",
    image: "http://placeimg.com/640/480/business",
    inStock: true,
    level: "advanced",
    material: "Granite",
    name: "Generic Concrete Table",
    offer: "Republic Day Sale",
    price: "84.00",
    quantity: 1,
    ratings: 2}],
    includeOutOfStock: false,
    onlyFastDelivery: false,
    sortBy: null,
    priceRange: null,
    isInWishList:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            //let addedItem = products.find(item=> item.id === action.item["id"])
            const existed_item= state.cart.find(item=> action.item["id"] === item.id)
         if(existed_item)
         {
            return {
                    ...state,
                    cart:state.cart.map(product=>product.id===action.item["id"]?{...product,quantity:product.quantity+1}:product)            
                    }
        }
        else{
            return {
                    ...state,
                    cart:[...state.cart,action.item]            
                    }
        }   
        case "REMOVE_FROM_CART":
            const removeItem=state.cart.filter(item=>item.id!==action.id);
            return {...state,
            cart:removeItem}
        case "ADD_QUANTITY":
            return {
                ...state,
                cart:state.cart.map(product=>product.id===action.id?{...product,quantity:product.quantity+1}:product,),
            };
        case "SUB_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(product =>
                    product.id === action.id
                    ? {
                        ...product,
                        quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
                        }
                    : product,
                ),
            };
            case "ADD_TO_WISHLIST":
                return{...state,
                cart:[...state.cart],
                wishlist:[...state.wishlist,action.payload],
                isInWishList:!state.isInWishList}
            case "REMOVE_FROM_WISHLIST":
                const removeWishItems=state.wishlist.filter(item=>item.id!==action.id);
                return {...state,
                cart:[...state.cart],
                wishlist:removeWishItems}
            case "MOVE_TO_CART":
                const wishItem=state.wishlist.find(item=>action.payload.id===item.id)
                const wishRemove=state.wishlist.filter(item=>item.id!==wishItem.id)
                const fromExisted_item= state.cart.find(item=> action.payload["id"] === item.id)
                if(fromExisted_item)
                {           
                    return {
                            ...state,
                            cart:state.cart.map(product=>product.id===action.payload["id"]?{...product,quantity:product.quantity+1}:product),     
                            wishlist:wishRemove
                            }
                }
                else{
                    return {
                            ...state,
                            cart:[...state.cart,action.item],
                            wishlist:wishRemove            
                            }
                }
            case "TOGGLE_REMOVE_FROM_WISHLIST":
                const removeWishItem=state.wishlist.filter(item=>item.id!==action.payload);
                if(action.payload===state.wishlist.id){
                    return {...state,cart:[...state.cart],wishlist:removeWishItem,isInWishList:!state.isInWishList}
                }
                else{
                    return {...state,cart:[...state.cart],wishlist:removeWishItem,isInWishList:!state.isInWishList}
                }
            case "LOW_TO_HIGH":
                console.log("Hi")
                return {
                    ...state,
                    sortBy: "LOW_TO_HIGH"
                  };
            case "HIGH_TO_LOW":
                return {
                    ...state,
                    sortBy: "HIGH_TO_LOW"
                  };
            case "OUT_OF_STOCK":
            return {
                ...state,
                includeOutOfStock: !state.includeOutOfStock
            };
            case "WITH_FAST_DELIVERY":
                return {
                    ...state,
                    onlyFastDelivery:!state.onlyFastDelivery
                }
        default:
            return state;
    }
}

export default reducer;