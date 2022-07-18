import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs';
import PageTitle from '../../Components/PageTitle';
import './Documents.scss'


const Documents:React.FC = () => {
  return (
    <main>
    <div className="container">
      <PageTitle text='Документы'/>
      <BreadCrumbs />
      <div className="documents">
        <ul className="documents__list">
          <li className="documents__item">
            <a className="documents__link" href="https://saranskkabel.ru/upload/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D1%82%D0%B8%D0%BF%D0%BE%D0%B2%D0%BE%D0%B9.doc">
              <img width={200} className="documents__img" src="/img/icons/documents.png" alt="" />
              <h3 className="documents__title">Шаблон типового договора</h3>
            </a>
          </li>
          <li className="documents__item">
            <a className="documents__link" target="_blank" href="/img/documents/r0jvw1zejo8hcn2wsid1mugqh1azaruu.jpg">
              <img width={200} className="documents__img" src="/img/icons/documents.png" alt="" />
              <h3 className="documents__title">Доверенность на получение продукции</h3>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
  )
}

export default Documents