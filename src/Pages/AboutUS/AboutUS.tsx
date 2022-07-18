import "./AboutUS.scss"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";
import AboutUSItem from "./AboutUSItem";
import PageTitle from "../../Components/PageTitle";

const AboutUS:React.FC = () => {
  return (
    <main>
      <div className="container">
        <PageTitle text="О компании"/>
        <BreadCrumbs/>
        <ul className="aboutUs-nav">
          <AboutUSItem
            linkTo="/aboutus/history"
            img="img/about Us/his.png"
            title="История"
            alt="History"
          />
          <AboutUSItem
            linkTo="/aboutus/requisites"
            img="/img/about Us/29682.png"
            title="Реквизиты"
            alt="Requisites"
          />
          <AboutUSItem
            linkTo="/aboutus/certificates"
            img="/img/about Us/certf.png"
            title="Сертификаты"
            alt="Сertificates"
          />
          <AboutUSItem
            linkTo="/aboutus/quality-policy"
            img="/img/about Us/qp.png"
            title="Политика качества"
            alt="Quality-policy"
          />
        </ul>
      </div>
    </main>
  )
}

export default AboutUS