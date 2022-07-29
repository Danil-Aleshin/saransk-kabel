import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseCofig";
import {IOrder} from '../types/data'

interface ordersState{
  orders:IOrder[],
  loading:boolean,
  error:boolean,
  status:string | undefined,
}
interface reqCheckoutOrderParams{
  userId:string,
  newOrder:IOrder
}
const initialState:ordersState = {
  orders: [],
  loading:false,
  error:false,
  status:"",
}
export const fetchOrders = createAsyncThunk<IOrder[],string,{rejectValue:string}>(
  "products/fetchOrders",
  async function (userId,{rejectWithValue}) {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const ordersData = docSnap.data().orders
          return ordersData
          
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      return rejectWithValue("Заказы отсутсвуют!")
    }
  
  }
)

//CheckoutOrder
export const reqCheckoutOrder = createAsyncThunk<IOrder,reqCheckoutOrderParams,{rejectValue:string}>(
  "products/reqCheckoutOrder",
  async function ({newOrder,userId},{rejectWithValue}) {
    try {
      const docRef = doc(db,"users", userId);
      await updateDoc(docRef,{
        orders:arrayUnion(newOrder)
      });
      return newOrder
    } catch (error) {
      return rejectWithValue("Не удалось сделать заказ!")
    }
  
  }
)
const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchOrders.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "fetchOrders loading"
      })
      .addCase(fetchOrders.fulfilled,(state,action:PayloadAction<IOrder[]>)=>{
        state.orders = action.payload.reverse()
        state.loading = false
        state.status = "fetchOrders fulfilled"
      })
      .addCase(fetchOrders.rejected,(state,action)=>{
        state.loading = true
        state.error = false
        state.status = action.payload
      })
    //checkoutOrder
      .addCase(reqCheckoutOrder.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "reqCheckoutOrder loading"
      })
      .addCase(reqCheckoutOrder.fulfilled,(state,action:PayloadAction<IOrder>)=>{
        state.orders.push(action.payload)
        state.loading = false
        state.status = "reqCheckoutOrder fulfilled"
      })
      .addCase(reqCheckoutOrder.rejected,(state,action)=>{
        state.loading = true
        state.error = false
        state.status = action.payload
      })
  }

})
export const {  } = OrdersSlice.actions

export default OrdersSlice.reducer