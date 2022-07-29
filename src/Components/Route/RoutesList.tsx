import React from 'react'
import { Routes, Route} from "react-router-dom";
import { useAppSelector } from '../../hooks/appRedux';
import NotFoundPage from '../../Pages/NotFoundPage';
import RequireAuth from '../Hoc/RequireAuth';
import { routes } from './RouteData';

const RoutesList:React.FC = () => {

  const {userAuth} = useAppSelector(state => state.auth)
  return (
    <Routes>
      {
        routes.map(route =>
          <Route 
            path={route.path} 
            key={route.path} 
            element={route.auth
              ? <RequireAuth><route.component/></RequireAuth> 
              : <route.component/>
            }
          />
        )
      }
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default RoutesList