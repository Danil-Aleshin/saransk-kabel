

interface propsOfficesCard{
  city:string, 
  address:string, 
  wMode:string, 
  room?:string, 
  rAddress?:string, 
  rName?:string, 
}

const OfficeCard:React.FC<propsOfficesCard> = ({ city, address, wMode, room, rAddress, rName })=> {
  return (
    <div className="office__item">
      <h3 className="city">{city}</h3>
      <b>{address}</b>
      <b>Режим работы: {wMode}</b>
      <h3 className="room">{room}</h3>
      <b>{rAddress}</b>
      <b>{rName}</b>
    </div>
  )
}

export default OfficeCard