import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseCofig";
import { IQualityPolicyCard } from "../types/data";

interface qualityPolicyState{
  qualityPolicy:IQualityPolicyCard[],
  loading:boolean,
  error:boolean,
  status:string,
}

const initialState:qualityPolicyState = {
  qualityPolicy: [],
  loading:false,
  error:false,
  status:"",
}
export const fetchQualityPolicy = createAsyncThunk<IQualityPolicyCard[],undefined,{rejectValue:string}>(
  "products/fetchQualityPolicy",
  async function (_,{rejectWithValue}) {
    try {
        const docRef = doc(db, "company content", "quality policy");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const qualityPolicyData = docSnap.data().arr
          return qualityPolicyData
          
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      return rejectWithValue("Server error!")
    }
  
  }
)
const QualityPolicySlice = createSlice({
  name: "qualityPolicy",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchQualityPolicy.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "fetchQualityPolicy loading"
      })
      .addCase(fetchQualityPolicy.fulfilled,(state,action:PayloadAction<IQualityPolicyCard[]>)=>{
        state.qualityPolicy = action.payload
        state.loading = false
        state.status = "fetchQualityPolicy fulfilled"
      })
      .addCase(fetchQualityPolicy.rejected,(state)=>{
        state.loading = false
        state.error = true
        state.status = "fetchQualityPolicy error"
      })
  }

})
export const {  } = QualityPolicySlice.actions

export default QualityPolicySlice.reducer