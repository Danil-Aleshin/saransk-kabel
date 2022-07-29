import AboutProduct from "../../Pages/AboutProduct/AboutProduct";
import AboutUS from "../../Pages/AboutUS/AboutUS";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import Authentication from "../../Pages/Authentication/Authentication";
import Registrarion from "../../Pages/Authentication/Registrarion";
import Cart from "../../Pages/Cart/Cart";
import Documents from "../../Pages/Documents/Documents";
import History from "../../Pages/History/History";
import Home from "../../Pages/Home/Home";
import Offices from "../../Pages/Offices/Offices";
import CheckoutOrder from "../../Pages/Orders/CheckoutOrder";
import ProductList from "../../Pages/ProductList/ProductList";
import Profile from "../../Pages/Profile/Profile";
import QualityPolicy from "../../Pages/QualityPolicy";
import Requisites from "../../Pages/Requisites/Requisites";
import SecurityPolicy from "../../Pages/SecurityPolicy";
import Stock from "../../Pages/Stock/Stock";
import Vacancies from "../../Pages/Vacancies";
import  Сertificates from "../../Pages/Сertificates/Сertificates";
import { IRoutes } from "../../types/data";


export const routes:IRoutes[] = [
  {
    path:"/",
    src:"",
    component:Home,
    name:"Главная страница",
    auth:false
  },
  {
    path:"/login",
    src:"login",
    component:Authentication,
    name:"Авторизация",
    auth:false
  },
  {
    path:"/registration",
    src:"registration",
    component:Registrarion,
    name:"Регистрация",
    auth:false
  },
  {
    path:"/cart",
    src:"cart",
    component:Cart,
    name:"Корзина",
    auth:false
  },
  {
    path:"/products",
    src:"products",
    component:AllProducts,
    name:"Каталог продукции",
    auth:false
  },
  {
    path:"/products/:src",
    component:ProductList,
    name:"",
    auth:false
  },
  {
    path:"/products/:src/:src",
    component:AboutProduct,
    name:"",
    auth:false,
  },
  {
    path:"/aboutus",
    src:"aboutus",
    component:AboutUS,
    name:"О компании",
    auth:false
  },
  {
    path:"/aboutus/history",
    src:"history",
    component:History,
    name:"История",
    auth:false
  },
  {
    path:"/aboutus/requisites",
    src:"requisites",
    component:Requisites,
    name:"Реквизиты",
    auth:false
  },
  {
    path:"/aboutus/certificates",
    src:"certificates",
    component:Сertificates,
    name:"Сертификаты",
    auth:false
  },
  {
    path:"/offices",
    src:"offices",
    component:Offices,
    name:"Офисы",
    auth:false
  },
  {
    path:"/aboutus/quality-policy",
    src:"quality-policy",
    component:QualityPolicy,
    name:"Контроль качества",
    auth:false
  },
  {
    path:"/security-policy",
    src:"security-policy",
    component:SecurityPolicy,
    name:"Политика безопасности",
    auth:false
  },
  {
    path:"/documents",
    src:"documents",
    component:Documents,
    name:"Шаблон документов",
    auth:false
  },
  {
    path:"/stock",
    src:"stock",
    component:Stock,
    name:"Политика безопасности",
    auth:false
  },
  {
    path:"/vacancies",
    src:"vacancies",
    component:Vacancies,
    name:"Вакансии",
    auth:false
  },
  {
    path:"/profile",
    src:"profile",
    component:Profile,
    name:"Профиль",
    auth:true
  },
  {
    path:"/checkout-order",
    src:"checkout-order",
    component:CheckoutOrder,
    name:"Оформление заказа",
    auth:true
  },
]