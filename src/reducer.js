
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
    wishlist:[],
    includeOutOfStock: false,
    onlyFastDelivery: false,
    sortBy: null,
    priceRange: null
}

const reducer=(state=initialState,action)=>{
    console.log(state.wishlist)
    switch(action.type){
        case "ADD_TO_CART":
            //let addedItem = products.find(item=> item.id === action.item["id"])
            let existed_item= state.cart.find(item=> action.item["id"] === item.id)
         if(existed_item)
         {
            console.log(action)
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
            console.log(action)
            let removeItem=state.cart.filter(item=>item.id!==action.id);
             //console.log(removeItem)
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
                wishlist:[...state.wishlist,action.item]}
            case "ADD_TO_CART_WISHLIST":
                let wishItem=state.wishlist.find(item=>action.item["id"]===item.id)
                let wishRemove=state.wishlist.filter(item=>item.id!==wishItem.id)
                let fromExisted_item= state.cart.find(item=> action.item["id"] === item.id)
                console.log(wishRemove)
                if(fromExisted_item)
                {           
                    return {
                            ...state,
                            cart:state.cart.map(product=>product.id===action.item["id"]?{...product,quantity:product.quantity+1}:product),     
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
            case "LOW_TO_HIGH":
                console.log(initialState.sortBy)
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