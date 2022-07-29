import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { fetchCertificates } from "../../store/CertificatesSlice"
import './Certificates.scss'

const Сertificates:React.FC = () => {
  const [modalWindowCertificates, setModalWindowCertificates] = useState(false)
  const [imgs, setImgs] = useState("")

  const {certificates} = useAppSelector(state=> state.certificates)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCertificates())
  }, [])
  
  useEffect(() => {
    if (modalWindowCertificates) {
      document.body.classList.add("lock")
    } else {
      document.body.classList.remove("lock")
    }
  }, [modalWindowCertificates])
  const toggleModalWindow = (img:string) => {
    setModalWindowCertificates(true)
    setImgs(img)
  }
  const close = (e:any) => {
    const el = e.target
    if (el.className === "modal-window active__window") {
      setModalWindowCertificates(false)
    }
  }
  return (
    <main>
      <div onClick={(e) => close(e)} className={modalWindowCertificates ? "modal-window active__window" : "modal-window"}>
        <Link to={imgs} target="_blank">
          <img
            className="enlarged__img"
            width={637} src={imgs} alt="" />
        </Link>
      </div>
      <div className="container">
        <PageTitle text="Сертификаты" />
        <BreadCrumbs />
        <div className="certificates">
          <ul className="certificates__list">
            {certificates.map((item, index) => {
              return (
                <li onClick={() => toggleModalWindow(item.img)} key={item.id} className="certificates__item">
                  <img width={250} src={item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </main>
  )
}
export default Сertificates