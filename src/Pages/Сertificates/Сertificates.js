import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../../Components/PageTitle"
import './Certificates.scss'

const Сertificates = () => {
  
  const [certificates, setCertificates] = useState([])
  const [modalWindowCertificates, setModalWindowCertificates] = useState(false)
  const [imgs, setImgs] = useState("")
  useEffect(() => {
    let cleanupFunction = false;
    async function fetchData() {
      try {
        const req = await axios.get('/certificatesDB.json')
        if (!cleanupFunction) setCertificates(req.data)
      } catch (error) {
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
  const toggleModalWindow = (img) => {
    setModalWindowCertificates(true)
    setImgs(img)
  }
  const close = e => {
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