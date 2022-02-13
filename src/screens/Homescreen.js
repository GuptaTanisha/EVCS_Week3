import React,{useEffect,useState} from 'react';
import Header from '../components/Header/Header';
import {CssBaseline,Grid } from '@material-ui/core';
import Map from '../components/Map/Map';
import List from '../components/List/List';
import { getPlacesData } from '../api';

const Homescreen = () => {
    const [places,setPlaces] = useState([]);
    const [type,setType] = useState('restaurants');
    const [coordinates, setCoordinates] = useState({});
    const [bounds,setBounds] = useState({});
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}} ) => {
            setCoordinates({lat:latitude, lng:longitude})
        })
        const API_KEY = process.env.REACT_APP_PLACES_API;
        const script = document.createElement('script'); 
        script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`; 
        document.head.append(script);
    },[])

    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
        console.log(coordinates,bounds)

        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data) => {
            console.log(data);
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setIsLoading(false);
            console.log({places});
        });
        }
    },[type,bounds])
    return(
        <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
            <List 
            places={places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            />
            </Grid>
            <Grid item xs={12} md={8}>
            <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            />
            </Grid>
        </Grid>
        </>
        )
}

export default Homescreen;