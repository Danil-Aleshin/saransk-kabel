import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from '../firebaseCofig'
import { ICartItem, IOrder, IUserData, IUserInfo } from "../types/data";

interface stateAuthentication{
  userInfo:IUserInfo,
  userAuth:boolean,
  loading:boolean,
  error:boolean,
  status:string | undefined,
}

interface propsFetchAuthentication{
  loginValue:string,
  passwordValue:string,
}
interface propsFetchRegistration{
  firstNameValue:string,
  lastNameValue:string,
  phoneNumberValue:string,
  emailValue:string,
  passwordValue:string,
}

//state
const initialState:stateAuthentication = {
  userInfo:{} as IUserInfo,
  userAuth: false,
  loading:false,
  error:false,
  status:"",
}

//authentication
export const fetchAuthentication = createAsyncThunk<
IUserInfo,
propsFetchAuthentication,
{rejectValue:string}>(
  "authentication/fetchAuthentication",
  async function({loginValue,passwordValue},{rejectWithValue}) {

    try {
      const userCredential:UserCredential = await signInWithEmailAndPassword(auth, loginValue, passwordValue)
      const user = userCredential.user;
      const userID = user.uid
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as IUserData
        return userData.userInfo
      } else {
        return rejectWithValue("No such document!")
      }
    } catch (error:any) {
      console.log(error.message)
      console.log(error.code)
      return rejectWithValue(error.code)
    }

  }
)

//registration
export const fetchRegistration = createAsyncThunk<any,propsFetchRegistration,{rejectValue:string}>(
  "authentication/fetchRegistration",
  async function({firstNameValue,
    lastNameValue,
    phoneNumberValue,
    emailValue,
    passwordValue
  },{rejectWithValue}) {
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid
      // ...
      const newUser:IUserInfo = {
        userId: userId,
        email: emailValue,
        password:passwordValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber:phoneNumberValue,
      }
      setDoc(doc(db, 'users', userId), {
        userInfo: newUser,
        cart: [],
        orders: []
      }, { merge: true })
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      return rejectWithValue("Не удалось зарегестрироваться :(")
    });
  }
)

//signOut
export const fetchSignOut = createAsyncThunk<any,undefined,{rejectValue:string}>(
  "authentication/fetchSignOut",
  async function(_,{rejectWithValue}){
    try {
      await signOut(auth)
    } catch (error) {
      return rejectWithValue("Ошибка соединения с сервером :(")
    }
  }
)

const AuthenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    //auth
      .addCase(fetchAuthentication.pending,(state)=>{
        state.loading = true
        state.status = "fetchAuthentication loading"
        state.error = false
        state.userAuth = false
      })
      .addCase(fetchAuthentication.fulfilled,(state,action:PayloadAction<IUserInfo>)=>{
        state.userInfo = action.payload
        state.userAuth = true
        state.loading = false
        state.status = "fetchAuthentication fulfield"
      })
      .addCase(fetchAuthentication.rejected,(state,action)=>{
        state.error = true
        state.loading = false
        state.userAuth = false
        state.status = action.payload
      })
    //signOut
      .addCase(fetchSignOut.pending,(state)=>{
        state.loading = true
        state.status = "fetchSignOut loading"
        state.error = false
      })
      .addCase(fetchSignOut.fulfilled,(state)=>{
        state.userInfo = {} as IUserInfo
        state.userAuth = false
        state.loading = false
        state.status = "signOut fulfilled"
      })
      .addCase(fetchSignOut.rejected,(state,action)=>{
        state.error = true
        state.status = action.payload
      })
  }

})
export const {} = AuthenticationSlice.actions

export default AuthenticationSlice.reducer