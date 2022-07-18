import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/data";

//interface
interface ICartState{
  cartItems:ICartItem[],
  cartTotalPrice:number
}
interface IChangeLength{
  id:number,
  newLength:number
}

//state
const initialState:ICartState = {
  cartItems: [],
  cartTotalPrice: 0
}


//slice
const CartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart(state, action:PayloadAction<ICartItem>) {
      
      const findItem = state.cartItems.find((objCart:ICartItem) => objCart.id === action.payload.id)

      if (!findItem) {
        state.cartItems.push(action.payload)
      } else {
        state.cartItems.find((objCart:ICartItem)=>{
          if (objCart.id === action.payload.id) {
            objCart.totalPrice = objCart.totalPrice + action.payload.totalPrice
            objCart.meters = objCart.meters + action.payload.meters
          }
        })
      }
    },
    removeCartItem(state, action:PayloadAction<number>) {
      state.cartItems.splice(action.payload, 1)
    },
    emptyCart(state) {
      state.cartItems = []
      state.cartTotalPrice = 0
    },
    changeLength(state, action:PayloadAction<IChangeLength>) {
      state.cartItems.find((objCart:ICartItem)=> {
        if (objCart.id === action.payload.id) {
          objCart.meters = action.payload.newLength
          objCart.totalPrice = objCart.pricePerM * action.payload.newLength
        }
      })

    },
    changeCartTotalPrice(state) {
      state.cartTotalPrice = 0
      state.cartItems.map((objCart:ICartItem)=> {
        state.cartTotalPrice = state.cartTotalPrice + objCart.totalPrice //rework {reduce}
      })
    }
  }

})

export const { addToCart, removeCartItem, emptyCart, changeLength, changeCartTotalPrice } = CartSlice.actions

export default CartSlice.reducer