export const initialState={
    products:[],
    cart:[],
    wishlist:[],
    includeOutOfStock: false,
    onlyFastDelivery: false,
    sortBy: null,
    priceRange: null,
    isInWishList:false,
    filterByCategories:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "GET_PRODUCT":
            return {...state,products:[action.payload]}
        case "GET_WISHLIST_ITEMS":
            return {...state,wishlist:action.payload}
        case "GET_CART_ITEMS":
            return{...state,cart:action.payload}
        case "ADD_TO_CART":
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
                const wishItem=state.wishlist.find(item=>action.payload === item.id)
                const wishRemove=state.wishlist.filter(item=>item.id !== wishItem.id)
                const fromExisted_item= state.cart.find(item=> action.payload === item.id)
                if(fromExisted_item!==undefined)
                {   
                    return {
                            ...state,
                            cart:state.cart.map(product=>product.id===action.payload ? {...product,quantity:product.quantity+1} : product),     
                            wishlist:wishRemove
                            }
                }
                else{
                    return {
                            ...state,
                            cart:[...state.cart,wishItem],
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
            case "RESET_FILTERS":
                return{
                    ...state,
                    sortBy:null,
                    includeOutOfStock:false,
                    onlyFastDelivery:false,
                    filterByCategories:[]
                }
            case "SHOW_ALL":
                state.filterByCategories=[];
                return {...state}
            case "FILTER_BY_CATEGORIES":
                return state.filterByCategories.includes(action.payload)
                ? {
                    ...state,
                      filterByCategories: state.filterByCategories.filter(
                        (item) => item !== action.payload
                      )
                    
                  }
                : {
                    ...state,
                      filterByCategories: state.filterByCategories.concat(
                        action.payload
                      )
                  };
        default:
            return state;
    }
}

export default reducer;