import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/appRedux';

import './Preloader.scss'
interface propsPreloader{
  loadingParams:boolean
}
const Preloader: React.FC<propsPreloader> = ({loadingParams}) => {

  const [deletePreloader, setDeletePreloader] = useState<boolean>(false)

  useEffect(() => {

    loadingParams || setTimeout(() => {
      setDeletePreloader(true)
    }, 3000);

    return () => clearTimeout()
    
  }, [loadingParams])

  return (
    deletePreloader ? null :
      <div className={loadingParams ? "preloader" : "preloader false"}>
        <div className='container'>
          <div className='circleOut'></div>
          <div className='circleIn'></div>
        </div>
      </div>
  )
}

export default Preloader