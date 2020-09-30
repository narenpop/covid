import React,{useState,useEffect} from 'react';
import {FormControl,Select, Menu, MenuItem, Card, CardContent} from '@material-ui/core'
import InfoBox from "./InfoBox"
import Table from "./Table"
import {sortData} from "./utils"
import './App.css';

function App() {
  const  [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide')
  const [countryInfo,setCountryInfo]=useState({})
  const [tableData,setTableData]=useState([])
  const [zoom,setZoom]=useState(3)
  const [mapCenter,setMapCenter]=useState({lat:34.80746,lng:-40.4796})


  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
    })
  },[])

 useEffect(() => {
  const getCountriesData= async()=>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data)=>{
    const countries=data.map((country)=>({
     
      name:country.country,
      value:country.countryInfo.iso2
    }));
        const sortedData=sortData(data)
        setTableData(sortedData)
        setCountries(countries)
   });
  };
  getCountriesData()  
 }, []);
 
 const onCountryChange = async(event)=>{
   const countryCode=event.target.value;
   const url=countryCode==='worldwide'?"https://disease.sh/v3/covid-19/all" :`https://disease.sh/v3/covid-19/countries/${countryCode}`
   await fetch(url).then((response)=>response.json())
   .then((data)=>{
     setZoom([data.countryInfo.lat,data.countryInfo.lng])
     setMapCenter(4)
     setCountryInfo(data)
     setCountry(countryCode)
   })
 };
 console.log(countryInfo)
  return (
    <div className="App">
    <div className="app__left">
    <div className="app__header">
     <h1>Covid 19 tracker</h1> 
     <FormControl className="app__dropdown">
       <Select onChange={onCountryChange} variant="outlined" value={country}>
       <MenuItem value="worldwide">worldwide</MenuItem>
        { countries.map((country)=>(
           <MenuItem value={country.value}>{country.name}</MenuItem>
         )) }    
       </Select>
     </FormControl>
     </div>
    <div className="app__stats">
       {/* infobox  title= coronovirrus*/} 
       <InfoBox title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
       <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
       <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>
    </div>
    <div className="app__right">
     <div>
      <Card>
        <CardContent>
          <h3>Live country stats</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
     
  )
}

export default App;
