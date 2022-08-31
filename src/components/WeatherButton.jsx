import React from 'react'
import { Button } from 'react-bootstrap'
const WeatherButton = ({cities,setCity,currentCity}) => {
  return (
    <div>
      <Button variant="primary" onClick={()=> currentCity('current')}>Current Location</Button>
      {cities.map((item,index)=>(
      <Button 
      key={index} 
      variant="primary" 
      onClick={()=>setCity(item)}
      >
        {item}</Button>
      ))}
      
    </div>
  )
}

export default WeatherButton
