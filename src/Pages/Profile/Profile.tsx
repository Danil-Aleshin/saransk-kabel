import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { fetchSignOut } from "../../store/AuthenticationSlice"
import { emptyCart } from "../../store/CartSlice"
import { fetchOrders } from "../../store/OrdersSlice"
import ProfileOrderItem from "./ProfileOrderItem"
import "./Profile.scss"

const Profile:React.FC = () => {

  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const {orders} = useAppSelector(state => state.orders)
  const {userId} = useAppSelector(state => state.auth.userInfo)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.userAuth) {
      navigate(-1)
    }
  }, [auth.userAuth])

  useEffect(() => {
    dispatch(fetchOrders(userId))
  }, [])
  
  const signOut = () => {
    dispatch(fetchSignOut())
    dispatch(emptyCart())
    if (auth.error) {
      alert(auth.status)
    }else{
      navigate("/")
    }
  }  
  return (
    <main>
      <div className="container">
        <PageTitle text={"Профиль"}/>
        <BreadCrumbs/>
        <div className="profile">
          <div className="user-info">
            <h1>
              {auth.userInfo?.firstName + " " + auth.userInfo?.lastName}
            </h1>
            <h3>
              {auth.userInfo?.email}
            </h3>
            <p>
              телефон: {auth.userInfo?.phoneNumber}
            </p>
            <p>
              id: {auth.userInfo?.userId}
            </p>
            <button className="logout__btn" onClick={()=>signOut()}>Выйти</button>
          </div>
          <ul className="orders__list">
            {orders.map(order => 
              <ProfileOrderItem
                key={order.id}
                {...order}
               />
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Profile