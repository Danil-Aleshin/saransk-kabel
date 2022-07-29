import { useEffect, useState, useRef, memo } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../../hooks/appRedux"
import './BreadCrumbs.scss'
import { routes } from '../../Components/Route/RouteData';
import { IRoutes } from "../../types/data";

const BreadCrumbs:React.FC = memo(() => {

  const [breadCrumbs, setBreadCrumbs] = useState<IRoutes[]>([])

  const products = useAppSelector(state => state.products.products)

  const refRevNav = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const arrCrumbs:any = []
    const str = location.pathname.split("\/")

    routes.map(route=>{
      str.map(pathName=>{ 
        route.src === pathName && arrCrumbs.push(route)
      })
    })
    products.map(product=>{
      str.map(pathName=>{ 
        product.src === pathName && arrCrumbs.push(product)
      })
      product.items.map(item=>{
        str.map(pathName=>{ 
          item.src === pathName && arrCrumbs.push(item)
        })
      })
    })
    setBreadCrumbs(arrCrumbs)
  }, [location.pathname,products])


  return (
    <ul className="rev-nav" ref={refRevNav}>
      {
        breadCrumbs.map((item:any, index:number) =>
          <li key={index} className="nav__item">
            <Link to={item.path}>{item.name}</Link>
          </li>
        )
      }
    </ul>
  )
})
export default BreadCrumbs