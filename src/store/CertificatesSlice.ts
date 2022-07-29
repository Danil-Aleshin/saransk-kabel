import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseCofig";
import { ICertificatesCard } from "../types/data";

interface certificatesState{
  certificates:ICertificatesCard[],
  loading:boolean,
  error:boolean,
  status:string,
}

const initialState:certificatesState = {
  certificates: [],
  loading:false,
  error:false,
  status:"",
}
export const fetchCertificates = createAsyncThunk<ICertificatesCard[],undefined,{rejectValue:string}>(
  "products/fetchCertificates",
  async function (_,{rejectWithValue}) {
    try {
        const docRef = doc(db, "company content", "certificates");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const certificatesData = docSnap.data().arr
          return certificatesData
          
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      return rejectWithValue("Server error!")
    }
  
  }
)
const CertificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchCertificates.pending,(state)=>{
        state.loading = true
        state.error = false
        state.status = "fetchCertificates loading"
      })
      .addCase(fetchCertificates.fulfilled,(state,action:PayloadAction<ICertificatesCard[]>)=>{
        state.certificates = action.payload
        state.loading = false
        state.status = "fetchCertificates fulfilled"
      })
      .addCase(fetchCertificates.rejected,(state)=>{
        state.loading = false
        state.error = true
        state.status = "fetchCertificates error"
      })
  }

})
export const {  } = CertificatesSlice.actions

export default CertificatesSlice.reducer