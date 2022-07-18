import { userInfo } from "os"
import { useNavigate } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { fetchSignOut } from "../../store/AuthenticationSlice"


const Profile:React.FC = () => {

  const user = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const signOut = ()=>{
    dispatch(fetchSignOut())
    if (user.error) {
      alert(user.error)
    }else{
      navigate("/")
    }
  }
  return (
    <main>
      <div className="container">
        <PageTitle text={user.userInfo?.firstName + " " + user.userInfo?.lastName}/>
        <BreadCrumbs/>
        <button onClick={()=>signOut()}>Выйти</button>
      </div>
    </main>
  )
}

export default Profile