import "./AllProducts.scss"
import { useAppSelector } from "../../hooks/appRedux";
import PageTitle from "../../Components/PageTitle";
import AllProductsCard from "../../Components/AllProductsCard/AllProductsCard";
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/ProductsSlice";


const AllProducts:React.FC = ()=> {

  const { products } = useAppSelector(state => state.products)
  
  return (
    <main>
      <div className="container">
        <PageTitle text="Каталог кабельно-проводниковой продукции" />
        <BreadCrumbs />
        <div className="product-card__list">
          {
            products.map(item => <AllProductsCard key={item.id} {...item} number={item.items.length} />)
          }
        </div>
      </div>
  </main>
  )
}

export default AllProducts