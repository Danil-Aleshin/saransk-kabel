import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseCofig";
import { IOfficesCard } from "../types/data";

interface officesState{
  offices:IOfficesCard[],
  loading:boolean,
  error:boolean,
  status:string,
}

const initialState:officesState = {
  offices: [],
  loading:false,
  error:false,
  status:"",
}
export const fetchOffices = createAsyncThunk<IOfficesCard[],undefined,{rejectValue:string}>(
  "products/fetchOffices",
  async function (_,{rejectWithValue}) {
    try {
        const docRef = doc(db, "company content", "offices");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const officesData = docSnap.data().arr
          return officesData
          
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      return rejectWithValue("Server error!")
    }
  
  }
)
const OfficesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchOffices.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "fetchOffices loading"
      })
      .addCase(fetchOffices.fulfilled,(state,action:PayloadAction<IOfficesCard[]>)=>{
        state.offices = action.payload
        state.loading = false
        state.status = "fetchOffices fulfilled"
      })
      .addCase(fetchOffices.rejected,(state)=>{
        state.loading = false
        state.error = true
        state.status = "fetchOffices error"
      })
  }

})
export const {  } = OfficesSlice.actions

export default OfficesSlice.reducer