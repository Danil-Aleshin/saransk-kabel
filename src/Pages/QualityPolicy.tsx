import axios from "axios"
import { HTMLAttributes, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BreadCrumbs from "../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../Components/PageTitle"
import './Сertificates/Certificates.scss'

const QualityPolicy:React.FC = ()=> {
  const [qualityPolicy, setQualityPolicy] = useState([])
  const [modalWindowCertificates, setModalWindowCertificates] = useState(false)
  const [imgs, setImgs] = useState("")
  
  useEffect(():any => {
    let cleanupFunction = false;
    async function fetchData() {
      try {
        const req = await axios.get('/qualityPolicyDB.json')
        if (!cleanupFunction) setQualityPolicy(req.data)
      } catch (error:any) {
        console.error(error.message)
      }
    }
    fetchData()
    return () => cleanupFunction = true;
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