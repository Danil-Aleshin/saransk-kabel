import './App.scss';
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { fetchProducts} from './store/ProductsSlice';
import { useAppDispatch, useAppSelector } from './hooks/appRedux';

//components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import SigIn from './Components/SigIn/Authentication';
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

const App:React.FC = () => {
  const [sigInWindowLog, setSigInWindowLog] = useState(false)

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.products)
  const location = useLocation()

  useEffect(() => {

    dispatch(fetchProducts())

  }, [])

  useEffect(() => {

    window.scroll(0, 0)

  }, [location.pathname])


  return (
    <div className="App">
      <Preloader />
      {
        loading ? null :
          <>
            <SigIn setSigInWindowLog={setSigInWindowLog} sigInWindowLog={sigInWindowLog} />
            <Header setSigInWindowLog={setSigInWindowLog} />
            {/* js */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart'
                element={<Cart setSigInWindowLog={setSigInWindowLog} signWindowLog={sigInWindowLog} />} />
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
              <Route path='profile' element={<Profile />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </>
      }
    </div>
  )
}

export default App;
