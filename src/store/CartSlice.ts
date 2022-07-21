import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseCofig";
import { useAppSelector } from "../hooks/appRedux";
import { ICartItem, IUserData } from "../types/data";

//interface
interface ICartState{
  cartItems:ICartItem[],
  cartTotalPrice:number,
  loading:boolean,
  error:boolean,
  status:string | undefined,
}
interface IChangeLength{
  id:number,
  newLength:number
}
//IProps
interface propsReqAddCartItem{
  cartItem:ICartItem,
  userId:string
}
interface propsReqDeleteCartItem{
  userId:string,
  index:number,
}

//state
const initialState:ICartState = {
  cartItems: [],
  cartTotalPrice: 0,
  loading:false,
  error:false,
  status:"",
}
//getUserCart
export const getUserCart = createAsyncThunk<ICartItem[],string,{rejectValue:string}>(
  "cart/getUserCart",
  async function(userId,{rejectWithValue}){
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as IUserData
        return userData.cart
      } else {
        return rejectWithValue("getUserCart No such document!")
      }
    } catch (error) {
      return rejectWithValue("Не удалось восстановить товары корзины :(")
    }
  }
)

//reqAddCartItem
export const reqAddCartItem = createAsyncThunk<ICartItem,propsReqAddCartItem,{rejectValue:string}>(
  "cart/reqAddCartItem",
  async function({cartItem,userId},{rejectWithValue}){
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        cart: arrayUnion(cartItem)
      });
      return cartItem
    } catch (error) {
      return rejectWithValue("Не удалось добавить товар в корзину :(")
    }
  }
)

//reqDeleteCartItem
export const reqDeleteCartItem = createAsyncThunk<ICartItem[],propsReqDeleteCartItem,{rejectValue:string,state:{cart: ICartState}}>(
  "cart/reqDeleteCartItem",
  async function({userId,index},{rejectWithValue,getState}){
    const modCartItems = getState().cart.cartItems.splice(index, 1)
    console.log(modCartItems)
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        cart: modCartItems
      });
      return modCartItems
    } catch (error) {
      return rejectWithValue("Не удалось удалить товар :(")
    }
  }
)
//slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action:PayloadAction<ICartItem>) {
      
      const findItem = state.cartItems.find((objCart:ICartItem) => objCart.id === action.payload.id)

      if (!findItem) {
        state.cartItems.push(action.payload)
      } else {
        state.cartItems.find((objCart:ICartItem)=>{
          if (objCart.id === action.payload.id) {
            objCart.totalPrice = objCart.totalPrice + action.payload.totalPrice // try to change to reduce 
            objCart.meters = objCart.meters + action.payload.meters
          }
        })
      }
    },
    removeCartItem(state, action:PayloadAction<number>) {
      state.cartItems.splice(action.payload, 1)
      state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
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
      state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
    }
  },
  extraReducers:(builder)=>{
    builder
    //getUserCart
      .addCase(getUserCart.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "loading getUserCart"
      })
      .addCase(getUserCart.fulfilled,(state,action:PayloadAction<ICartItem[]>)=>{
        state.loading = false
        state.error = false
        state.status = "fulfilled getUserCart"
        state.cartItems = action.payload
        state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
      })
      .addCase(getUserCart.rejected,(state,action)=>{
        state.loading = false
        state.error = true
        state.status = action.payload
      })
    //reqAddCartItem
      .addCase(reqAddCartItem.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "loading"
      })
      .addCase(reqAddCartItem.fulfilled,(state,action:PayloadAction<ICartItem>)=>{
        state.loading = false
        state.error = false

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
        state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
        state.status = "reqAddCartItem fulfilled"
      })
      .addCase(reqAddCartItem.rejected,(state,action)=>{
        state.loading = false
        state.error = true
        state.status = action.payload
      })
    //reqDeleteCartItem
    .addCase(reqDeleteCartItem.pending,(state)=>{
      state.loading = true
      state.error = false
      state.status = "loading reqDeleteCartItem"
    })
    .addCase(reqDeleteCartItem.fulfilled,(state,action:PayloadAction<ICartItem[]>)=>{
      state.loading = false
      state.error = false
      state.status = "fulfilled reqDeleteCartItem"
      state.cartItems = action.payload
      state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
    })
    .addCase(reqDeleteCartItem.rejected,(state,action)=>{
      state.loading = false
      state.error = true
      state.status = action.payload
    })

  }

})

export const { addToCart, removeCartItem, emptyCart, changeLength, changeCartTotalPrice } = CartSlice.actions

export default CartSlice.reducer