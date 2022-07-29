import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import BreadCrumbs from "../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../Components/PageTitle"
import { useAppSelector } from "../hooks/appRedux"
import { fetchQualityPolicy } from "../store/QualityPolicySlice"

import './Сertificates/Certificates.scss'

const QualityPolicy:React.FC = ()=> {

  const [modalWindowCertificates, setModalWindowCertificates] = useState(false)
  const [imgs, setImgs] = useState("")

  const {qualityPolicy} = useAppSelector(state => state.qualityPolicy)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQualityPolicy())
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
        <PageTitle text="Политика качества"/>
        <BreadCrumbs />
        <div className="certificates">
          <ul className="certificates__list">
            {qualityPolicy.map((item:any, index) => {
              return (
                <li onClick={() => toggleModalWindow(item.img)} key={index} className="certificates__item">
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

export default QualityPolicy