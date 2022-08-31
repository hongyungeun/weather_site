import './App.css';
import {useState,useEffect} from 'react'
import WeatherBox from './components/WeatherBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from './components/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

  // const [weather,setWeather] = useState('')
  const [weather, setWeather] = useState(
    {
      main: {
        temp: 0.0
      },
      weather: [{
        description: ''
      }]
    }
  )
  const cities = ['tokyo','paris','new york','seoul']
  const [city,setCity]= useState('')
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    });
  }
  const getWeatherByCurrentLocation = async(lat, lon) => {
    let apiKey = '510dd91e3b978b550921d39bc059b284'
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setLoading(false)
    
  }
  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=510dd91e3b978b550921d39bc059b284&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setLoading(false)
  }
  const currentCity = (city)=>{
    if(city == 'current'){
      setCity('')
    }else {
      setCity(city)
    }
  }
  useEffect(()=>{
    if(city == ''){
      getCurrentLocation()
    }else {
      getWeatherByCity()
    }
  },[city])

  return (
    <div className="App">
      {loading?(<ClipLoader className='loding' color={color} loading={loading} size={150} />): (<div className='container_wrap'>
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity} currentCity={currentCity}/>
      </div>) }
      
      
    </div>
  );
}

export default App;
