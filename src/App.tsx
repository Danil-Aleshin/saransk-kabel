import './App.scss';
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { fetchProducts} from './store/ProductsSlice';
import { useAppDispatch, useAppSelector } from './hooks/appRedux';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Preloader from './Components/Preloader/Preloader'
import { getUserCart } from './store/CartSlice';
import RoutesList from './Components/Route/RoutesList';

const App:React.FC = () => {

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.products)
  const currentTheme = useAppSelector(state => state.theme.theme)
  const {userId} = useAppSelector(state => state.auth.userInfo)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(getUserCart(userId))
    // async function z (){
    //   const products = await axios.get("/db.json")
    //   a(products.data)
    // }
    // z()
  }, [])

  useEffect(() => {
    window.scroll(0, 0)
  }, [location.pathname])
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  // const a = async (b:any) =>{
  //   const docRef = doc(db,"products", "cables");
  //   await updateDoc(docRef,{
  //     arr:b
  //   });
  // }

  return (
    <div className="App">
      <Preloader loadingParams={loading} />
      {
        loading ? null :
          <>
          <Header />
            <RoutesList/>
          <Footer />
          </>
      }
    </div>
  )
}

export default App;
