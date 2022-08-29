import React, { useEffect, useState } from 'react'//We import React bcoz we can write jsx which looks like a html.
import './css/style.css'

function TempApp() {
    const [city, setCity] = useState('Pune')
    const [search, searchCity] = useState('Pune')//We are getting the data with the help of API call in useEffect and storing it in the state.

    useEffect(()=>{
        const fetchApi = async () =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a4f831d3cf0f1b52eacb5f9de2db3311`
            const response = await fetch(url)
            const resJson = await response.json();
            setCity(resJson.main);//Earlier we wrote here only resJson but what was happening that when we start searching it was not rendering the component and was showing error that temp is not defined.We want to get the data only from main,so we specified resJson.main as an argument in setCity, so now that is city and in jsx we can define city.temp i.e basically resJson.main.temp
        }
        fetchApi();
    },[search])//We are passing second parameter with dependency in useEffect bcoz as the dependency changes ie the search changes it should render the component only once and should stop the furter execution.

    return (
    <>
    <div className='box'>
        <div className='inputData'>
            <input type="search" className="inputField" value={search} onChange={(e)=> searchCity(e.target.value)}/>
        </div>
  
{!city ? (
    <p className='errorMsg'>No Data Found</p>
):(
    <>
    <div className='info'>
    <h2 className='location'>
    <i class="fas fa-street-view">{search}</i>
    </h2>
    <h1 className='temp'>
{city.temp}°Cel
    </h1>
    <h3 className='tempmin_max'>
      Min: {city.temp_min}°Cel | Max: {city.temp_max}°Cel
    </h3>
</div>
<div className='wave1'></div>
<div className='wave2'></div>
<div className='wave3'></div>
</>
)
}
    </div>
    </> // We used ternary operator because earlier when we specified the city.main.temp it was not rendering the component because it was not getting the city , so react told us to write perfectly so we took help of the ternary operator which says if there is no city simply show No Data Found and if the city exists render the data of that city. 
  )
}

export default TempApp


    