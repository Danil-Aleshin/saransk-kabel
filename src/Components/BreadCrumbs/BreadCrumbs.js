import { useEffect, useState, useRef, memo } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import './BreadCrumbs.scss'
const BreadCrumbs = memo(() => {
  const products = useSelector(state => state.products.products)
  const refRevNav = useRef(null)
  const pages = [
    {
      name: "Главная",
      src: "",
      srcNav: "/",
    },
    {
      name: "Каталог продукции",
      src: "products",
      srcNav: "/products",
    },
    {
      name: "Корзина",
      src: "cart",
      srcNav: "/cart"
    },
    {
      name: "О компании",
      src: "aboutus",
      srcNav: "/aboutus"
    },
    {
      name: "Политика безопасности",
      src: "security-policy",
      srcNav: "/security-policy"
    },
    {
      name: "Сертификаты",
      src: "certificates",
      srcNav: "/aboutus/certificates"
    },
    {
      name: "Политика качества",
      src: "quality-policy",
      srcNav: "/aboutus/quality-policy"
    },
    {
      name: "Офисы",
      src: "offices",
      srcNav: "/offices"
    },
    {
      name: "Документы",
      src: "documents",
      srcNav: "/documents"
    },
    {
      name: "Складское наличие",
      src: "stock",
      srcNav: "/stock"
    },
    {
      name: "Вакнасии",
      src: "vacancies",
      srcNav: "/vacancies"
    },
    {
      name: "История",
      src: "history",
      srcNav: "/history"
    },
    {
      name: "Реквизиты",
      src: "requisites",
      srcNav: "/requisites"
    },
    {
      name: "Профиль",
      src: "profile",
      srcNav: "/profile"
    }
  ]
  const [breadCrumbs, SetBreadCrumbs] = useState([])
  const location = useLocation()
  useEffect(() => {
    const arrCrumbs = []
    let str = location.pathname.split("\/")
    pages.map(page => {
      str.map(name => {
        if (page.src === name) {
          arrCrumbs.push(page)
        }
      })
    })
    products.map(el => {
      str.map(name => {
        if (el.src === name) {
          arrCrumbs.push(el)
        }
      })
      el.items.map(item => {
        str.map(name => {
          if (item.src === name) {
            arrCrumbs.push(item)
          }
        })
      })
    });
    const revNav = refRevNav.current
    revNav.scrollLeft = revNav.offsetWidth // не работает скрол
    SetBreadCrumbs(arrCrumbs)
  }, [location.pathname, products])


  return (
    <ul className="rev-nav" ref={refRevNav}>
      {
        breadCrumbs.map((item, index) =>
          <li key={index} className="nav__item"><Link to={item.srcNav}>{item.name}</Link></li>
        )
      }
    </ul>
  )
})
export default BreadCrumbs