import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseCofig";
import {IProductsCategoryItem, IProductsData} from '../types/data'

interface productsState{
  products:IProductsCategoryItem[],
  loading:boolean,
  error:string | null,
}

const initialState:productsState = {
  products: [],
  loading:false,
  error:null,
}
export const fetchProducts = createAsyncThunk<IProductsCategoryItem[],undefined,{rejectValue:string}>(
  "products/fetchProducts",
  async function (_,{rejectWithValue}) {
    try {
        const docRef = doc(db, "products", "cables");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productsData = docSnap.data().arr
          return productsData
          
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      return rejectWithValue("Server error!")
    }
  
  }
)
const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.products = action.payload
        state.loading = false
      })
  }

})
export const {  } = ProductsSlice.actions

export default ProductsSlice.reducer