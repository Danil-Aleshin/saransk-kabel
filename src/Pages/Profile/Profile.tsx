import { userInfo } from "os"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { fetchSignOut } from "../../store/AuthenticationSlice"


const Profile:React.FC = () => {

  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.userAuth) {
      navigate(-1)
    }
  }, [auth.userAuth])


  const signOut = () => {
    dispatch(fetchSignOut())
    if (auth.error) {
      alert(auth.status)
    }else{
      navigate("/")
    }
  }
  return (
    <main>
      <div className="container">
        <PageTitle text={auth.userInfo?.firstName + " " + auth.userInfo?.lastName}/>
        <BreadCrumbs/>
        <p>
          email: {auth.userInfo?.email}
        </p>
        <p>
          телефон: {auth.userInfo?.phoneNumber}
        </p>
        <p>
          id: {auth.userInfo?.userId}
        </p>
        <button onClick={()=>signOut()}>Выйти</button>
      </div>
    </main>
  )
}

export default Profile