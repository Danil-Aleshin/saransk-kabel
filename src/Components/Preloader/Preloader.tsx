import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/appRedux';

import './Preloader.scss'


const Preloader: React.FC = () => {
  const [deletePreloader, setDeletePreloader] = useState<boolean>(false)
  const {loading} = useAppSelector(state => state.products)
  

  useEffect(() => {


    loading || setTimeout(() => {
      setDeletePreloader(true)
    }, 3000);

    return () => clearTimeout()
    
  }, [loading])

  return (
    deletePreloader ? null :
      <div className={loading ? "preloader" : "preloader false"}>
        <div className='container'>
          <div className='circleOut'></div>
          <div className='circleIn'></div>
        </div>
      </div>
  )
}

export default Preloader