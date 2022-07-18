import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import PageTitle from '../../Components/PageTitle'
import './Requisites.scss'

const Requisites:React.FC = () => {
  return (
    <main>
    <div className='container'>
      <PageTitle text='Реквизиты'/>
      <BreadCrumbs/>
      <ul className='requisites__list'>
        <li className='requisites__item'>
          <h3 className='requisites__title'>ООО "Сарансккабель"</h3>
          <p>Россия, Республика Мордовия, 430001, г. Саранск, ул. Строительная, 3.</p>
          <p>ИНН 7810014283</p>
          <p>КПП 132701001</p>
          <p>ОГРН 1047855154489</p>
        </li>
        <li className='requisites__item'>
          <h3 className='requisites__title'>Банковские реквизиты</h3>
          <p>Наименование банка: Филиал "Центральный" Банка ВТБ (ПАО) в г.Москве</p>
          <p>р/счет 40702810813240001052</p>
          <p>корр/счет 30101810145250000411</p>
          <p>БИК 044525411</p>
        </li>
        <li className='requisites__item'>
          <h3 className='requisites__title'>Железднодорожные реквизиты</h3>
          <p>Станция: Саранск,Куйбышевской ж/д</p>
          <p>Код станции: 641608</p>
          <p>Получатель: ООО «Сарансккабель»</p>
          <p>Код получателя: 6512</p>
          <p>Адрес получателя: Россия, Республика Мордовия, 430001, г. Саранск, ул. Строительная,3</p>
        </li>
      </ul>
    </div>
  </main>
  )
}

export default Requisites