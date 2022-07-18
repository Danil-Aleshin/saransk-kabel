import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from '../firebaseCofig'
import { IUserData, IUserInfo } from "../types/data";

interface stateAuthentication{
  userInfo:IUserInfo | null,
  userAuth:boolean,
  loading:boolean,
  error:any,
  // string | null | undefined,
  status:"loading" | "fulfield" | "rejected" | null,
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
  userInfo:null,
  userAuth: false,
  loading:false,
  error:null,
  status:null,
}

//authentication
export const fetchAuthentication = createAsyncThunk<
IUserInfo | null,
propsFetchAuthentication,
{rejectValue:string}>(
  "authentication/fetchAuthentication",
  async function({loginValue,passwordValue},{rejectWithValue}) {
    let uInfo:IUserInfo | null = null // retrun value

    await signInWithEmailAndPassword(auth, loginValue, passwordValue)
    .then(async(userCredential) => { 
      const user = userCredential.user;
      const userID = user.uid
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as IUserData
        uInfo = userData.userInfo
        
      } else {
        console.log("No such document!");
      }
      
    })
    .catch((error)=>{
      console.log(error.message)
      console.log(error.code)
    })

    if (uInfo !== null) {
      return uInfo
    }else{
      return rejectWithValue("Неверный логин или пароль :(")
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
export const fetchSignOut = createAsyncThunk<boolean,undefined,{rejectValue:string}>(
  "authentication/fetchSignOut",
  async function(_,{rejectWithValue}){
    let resp: boolean = false
    signOut(auth).then(() => {
      resp = true
    }).catch((error) => {
      resp = false
    });

    if (!resp) {
     return rejectWithValue("Ошибка соединения с сервером :(")
    }else{
      return resp
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
        state.status = "loading"
        state.error = null
        state.userAuth = false
      })
      .addCase(fetchAuthentication.fulfilled,(state,action:PayloadAction<IUserInfo | null>)=>{
        state.userInfo = action.payload
        state.userAuth = true
        state.loading = false
        state.status = "fulfield"
      })
      .addCase(fetchAuthentication.rejected,(state,action)=>{
        state.error = action.payload
        state.loading = false
        state.userAuth = false
        state.status = "rejected"
      })
    //signOut
      .addCase(fetchSignOut.pending,(state)=>{
        state.loading = true
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchSignOut.fulfilled,(state)=>{
        console.log("first")
        state.userInfo = null
        state.userAuth = false
        state.loading = false
        state.status = null
        // const {
        //   userInfo = null,
        //   userAuth = false,
        //   loading = false,
        //   error = null,
        //   status = null
        // } = state
      })
      .addCase(fetchSignOut.rejected,(state,action)=>{
        state.error = action.payload
        state.status = "rejected"
      })
  }

})
export const {} = AuthenticationSlice.actions

export default AuthenticationSlice.reducer