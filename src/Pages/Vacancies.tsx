import BreadCrumbs from "../Components/BreadCrumbs/BreadCrumbs"
import PageTitle from "../Components/PageTitle"

const Vacancies:React.FC = () => {
  return (
    <main className="vacancies">
    <div className="container">
      <PageTitle text="Вакансии"/>
      <BreadCrumbs />
      <div className="vacancies__list">
        <h3 className="vacancy__title">ООО "Сарансккабель" примет на постоянную работу на конкурсной основе</h3>
        <p className="vacancy">Инженера-электроника</p>
        <p className="vacancy">Инженера-испытателя</p>
        <p className="vacancy">Инженера-технолога</p>
        <p className="vacancy">Водителя погрузчика</p>
        <p className="vacancy">Стропальщика</p>
        <p className="vacancy">Электромонтера по ремонту и обслуживанию электрооборудования</p>
        <p className="vacancy">Слесаря-ремонтника</p>
        <p className="vacancy">Резчика холодного металла</p>
        <p className="vacancy">Тракториста</p>
        <h3 className="vacancy__title">Так же открыт прием учеников по профессиям</h3>
        <p className="vacancy">Опрессовщик кабелей и проводов пластикатами и резиной в горячем состоянии</p>
        <p className="vacancy">Волочильщик проволоки</p>
        <p className="vacancy">Бронировщик кабелей</p>
        <p className="vacancy">Скрутчик изделий кабельного производства</p>
        <p>Заработная плата после обучения до 70 000 рублей в месяц</p>
        <p>Телефон отдела кадров: 777-667  доб. 499/490</p>
      </div>
    </div>
  </main>
  )
}

export default Vacancies

