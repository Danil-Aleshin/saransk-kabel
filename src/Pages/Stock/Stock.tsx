import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import './Stock.scss'

const Stock:React.FC = () => {
  return (
    <main>
      <div className='container'>
        <div className='page-title'>
          <h2>Складское наличие</h2>
        </div>
        <BreadCrumbs />
        <div className='stock'>
          <img width={1024} className='stock__img' src="/img/about Us/ss5uhozl5e67q7kwto5pnhp2xfqchv6s.jpg" alt="" />
          <h3 className='stock__title'>Уважаемые клиенты!</h3>
          <p className='stock__text'>На складах ООО "Сарансккабель"
            всегда в наличии более 2500 позиций
            ликвидной кабельно-проводниковой продукции.
            Оперативно получать информацию о ценах и наличии
            кабельной продукции можно  у Вашего персонального менеджера,
            либо обратившись по телефону
            <a href="tel:88007075458" className='orng'> 8 (800) 707-54-58</a> или на почту
            <a href="mailto:crm@saranskkabel.ru" className='orng'> crm@saranskkabel.ru </a>
          </p>
          <a className='stock__downloadLink' href="https://saranskkabel.ru/upload/sklad04.xlsx">Скачать каталог склада</a>
        </div>
      </div>
    </main>
  )
}

export default Stock