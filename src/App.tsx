import './App.scss';
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { fetchProducts} from './store/ProductsSlice';
import { useAppDispatch, useAppSelector } from './hooks/appRedux';

//components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Preloader from './Components/Preloader/Preloader'
//pages
import Requisites from './Pages/Requisites/Requisites';
import QualityPolicy from './Pages/QualityPolicy';
import SecurityPolicy from './Pages/SecurityPolicy';
import Documents from './Pages/Documents/Documents';
import Stock from './Pages/Stock/Stock';
import Vacancies from './Pages/Vacancies';
import NotFoundPage from './Pages/NotFoundPage';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import AllProducts from './Pages/AllProducts/AllProducts';
import ProductList from './Pages/ProductList/ProductList';
import AboutProduct from './Pages/AboutProduct/AboutProduct';
import AboutUS from './Pages/AboutUS/AboutUS';
import Offices from './Pages/Offices/Offices';
import History from './Pages/History/History';
import  Сertificates from "./Pages/Сertificates/Сertificates";
import Profile from './Pages/Profile/Profile';
import RequireAuth from './Components/Hoc/RequireAuth';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Authentication from './Pages/Authentication/Authentication';
import Registrarion from './Pages/Authentication/Registrarion';
import { getUserCart } from './store/CartSlice';

const App:React.FC = () => {

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.products)
  const currentTheme = useAppSelector(state => state.theme.theme)
  const {userId} = useAppSelector(state => state.auth.userInfo)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(getUserCart(userId))
  }, [])

  useEffect(() => {
    window.scroll(0, 0)
  }, [location.pathname])
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])


  return (
    <div className="App">
      <Preloader loadingParams={loading} />
      {
        loading ? null :
          <>
          <Header />
            <Routes>
              <Route path='login' element={<Authentication />} />
              <Route path='registration' element={<Registrarion />} />
              <Route path='/' element={<Home />} />
              <Route path='/cart'element={<Cart/>} />
              <Route path='products' element={<AllProducts />} />
              <Route path='products/:src' element={<ProductList />} />
              <Route path='products/:src/:src' element={<AboutProduct />} />
              <Route path='aboutus' element={<AboutUS />} />
              <Route path='/offices' element={<Offices />} />
              <Route path='aboutus/history' element={<History />} />
              <Route path='aboutus/requisites' element={<Requisites />} />
              <Route path='aboutus/certificates' element={<Сertificates />} />
              <Route path='aboutus/quality-policy' element={<QualityPolicy />} /> //rework - new file | routes | dataRoutes
              <Route path='security-policy' element={<SecurityPolicy />} />
              <Route path='documents' element={<Documents />} />
              <Route path='stock' element={<Stock />} />
              <Route path='vacancies' element={<Vacancies />} />
              <Route path='*' element={<NotFoundPage />} />

              //private route
              <Route path='profile' element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />
            </Routes>
            <Footer />
          </>
      }
    </div>
  )
}

export default App;
