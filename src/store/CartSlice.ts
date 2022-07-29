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
  id:number,
}
interface propsreqChangeLength{
  userId:string,
  id:number,
  newLength:number,
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
export const reqAddCartItem = createAsyncThunk<ICartItem,propsReqAddCartItem,{rejectValue:string,state:{cart: ICartState}}>(
  "cart/reqAddCartItem",
  async function({cartItem,userId},{rejectWithValue,getState}){
    let newCartItems:any = []
    const findItem = getState().cart.cartItems.find((objCart:ICartItem) => objCart.id === cartItem.id)
    if (findItem) {
      newCartItems = getState().cart.cartItems.map((objCart:ICartItem)=>
        objCart.id === cartItem.id 
        ?{ ...objCart, meters: objCart.meters + cartItem.meters, totalPrice: objCart.totalPrice + cartItem.totalPrice}
        : objCart
      )
    }
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        cart: findItem ? newCartItems :arrayUnion(cartItem)
      });
      return findItem ? newCartItems : cartItem
    } catch (error) {
      return rejectWithValue("Не удалось добавить товар в корзину :(")
    }
  }
)
//reqChangeLength
export const reqChangeLength = createAsyncThunk<ICartItem[],propsreqChangeLength,{rejectValue:string,state:{cart: ICartState}}>(
  "cart/reqChangeLength",
  async function({id,userId,newLength},{rejectWithValue,getState}){
    newLength = newLength === 0 ? 1 : newLength
     const newCartItems:any = getState().cart.cartItems.map((objCart)=>
      objCart.id === id 
      ?{ ...objCart, meters:newLength, totalPrice: objCart.pricePerM * newLength}
      : objCart
    )
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        cart: newCartItems
      });
      return newCartItems
    } catch (error) {
      return rejectWithValue("Не удалось изменить длину")
    }
  }
)

//reqDeleteCartItem
export const reqDeleteCartItem = createAsyncThunk<ICartItem[],propsReqDeleteCartItem,{rejectValue:string,state:{cart: ICartState}}>(
  "cart/reqDeleteCartItem",
  async function({userId,id},{rejectWithValue,getState}){
    const modCartItems = getState().cart.cartItems.filter(item => item.id !== id)
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

//reqEmptyCart
export const reqEmptyCart = createAsyncThunk<any,string,{rejectValue:string}>(
  "cart/reqEmptyCart",
  async function(userId,{rejectWithValue}){
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        cart: []
      });
    } catch (error) {
      return rejectWithValue("Не удалось очистить корзину :(")
    }
  }
)
//slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action:PayloadAction<ICartItem>) {
      const findItem = state.cartItems.find((objCart) => objCart.id === action.payload.id)
      if (!findItem) {
        state.cartItems.push(action.payload)
      } else {
        state.cartItems.map((objCart)=>
        objCart.id === action.payload.id 
        ?{ ...objCart, meters: objCart.meters + action.payload.meters, totalPrice: objCart.totalPrice + action.payload.totalPrice}
        : objCart
        )
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
      state.cartItems.map((objCart:ICartItem)=>{
        if (objCart.id === action.payload.id) {
          objCart.meters = action.payload.newLength === 0 ? 1 : action.payload.newLength
          objCart.totalPrice = objCart.pricePerM * action.payload.newLength
        }
      })
      // state.cartItems.map((objCart)=>
      // objCart.id === action.payload.id 
      // ?{ ...objCart, meters:action.payload.newLength, totalPrice: objCart.pricePerM * action.payload.newLength}
      // : objCart
      // )
      state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
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
        state.status = "reqAddCartItem loading"
      })
      .addCase(reqAddCartItem.fulfilled,(state,action:PayloadAction<ICartItem | ICartItem[]>)=>{
        state.loading = false
        state.error = false
        Array.isArray(action.payload) ? state.cartItems = action.payload : state.cartItems.push(action.payload)
        state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
        state.status = "reqAddCartItem fulfilled"
      })
      .addCase(reqAddCartItem.rejected,(state,action)=>{
        state.loading = false
        state.error = true
        state.status = action.payload
      })
    //ChangeLength
      .addCase(reqChangeLength.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "reqChangeLength loading"
      })
      .addCase(reqChangeLength.fulfilled,(state,action:PayloadAction<ICartItem[]>)=>{
        state.loading = false
        state.error = false
        state.cartItems = action.payload
        state.cartTotalPrice = state.cartItems.reduce((sum,current)=> sum + current.totalPrice ,0)
        state.status = "reqChangeLength fulfilled"
      })
      .addCase(reqChangeLength.rejected,(state,action)=>{
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
  //reqEmptyCart
    .addCase(reqEmptyCart.pending,(state)=>{
      state.loading = true
      state.error = false
      state.status = "loading reqEmptyCart"
    })
    .addCase(reqEmptyCart.fulfilled,(state,action:PayloadAction<ICartItem[]>)=>{
      state.loading = false
      state.error = false
      state.status = "fulfilled reqEmptyCart"
      state.cartItems = []
      state.cartTotalPrice = 0
    })
    .addCase(reqEmptyCart.rejected,(state,action)=>{
      state.loading = false
      state.error = true
      state.status = action.payload
    })

  }

})

export const { addToCart, removeCartItem, emptyCart, changeLength, changeCartTotalPrice } = CartSlice.actions

export default CartSlice.reducer