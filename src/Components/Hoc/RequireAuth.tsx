import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/appRedux'

interface propsRequireAuth{
  children:JSX.Element
  
}
const RequireAuth:React.FC<propsRequireAuth> = ({children}) => {

  const location = useLocation()

  const {userAuth} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  if (!userAuth) {

    return <Navigate to="/login"/>
  }

  return children
}

export default RequireAuth