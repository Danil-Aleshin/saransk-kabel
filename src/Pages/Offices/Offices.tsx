import "./Offices.scss"
import React, { useEffect} from 'react'
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import OfficeCard from "./OfficeCard"
import { useAppDispatch, useAppSelector } from "../../hooks/appRedux"
import { fetchOffices } from "../../store/OfficesSlice"
import PageTitle from "../../Components/PageTitle"

const Offices:React.FC = () => {
  
  const {offices} = useAppSelector(state => state.offices)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOffices())
  }, [])
  
  return (
    <main>
      <div className="container">
        <PageTitle text="Офисы"/>
        <BreadCrumbs />
        <div className="offices__list">
          {offices.map(item => <OfficeCard 
            key={item.id} 
            city={item.city}
            address={item.address}
            wMode={item.wMode} 
            room={item.room}
            rAddress={item.rAddress}
            rName={item.rName}
          />)}
        </div>
      </div>
    </main>
  )
}

export default Offices