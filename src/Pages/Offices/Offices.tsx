import "./Offices.scss"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs"
import OfficeCard from "./OfficeCard"

interface IOfficesCard{
  id:number,
  city:string, 
  address:string, 
  wMode:string, 
  room?:string, 
  rAddress?:string, 
  rName?:string, 
}

const Offices:React.FC = ()=> {
  const [officesList, setOfficesList] = useState<IOfficesCard[]>([])
  useEffect(():any => {
    let cleanupFunction = false;
    async function fetchData() {
      try {
        const req = await axios.get('/officesDb.json')
        if (!cleanupFunction) setOfficesList(req.data)
      } catch (error:any) {
        console.error(error.message)
      }
    }
    fetchData()
    return () => cleanupFunction = true;
  }, [])
  return (
    <main>
      <div className="container">
        <div className="page-title">
          <h2>Офисы</h2>
        </div>
        <BreadCrumbs />
        <div className="offices__list">
          {officesList.map(item => <OfficeCard 
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