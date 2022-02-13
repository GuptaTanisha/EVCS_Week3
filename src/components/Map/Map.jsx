import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
const Map = ({setCoordinates,setBounds,coordinates,places}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('min-width:600px');
    return (
        <div className={classes.mapContainer}>
        <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.REACT_APP_PLACES_API}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}
        onChange={(e) => {
            setCoordinates(
                {lat: e.center.lat,lng: e.center.lng});
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
        }}>
        {
            places?.map((place,i) => (
                <div
                 className={classes.markerContainer}
                 lat={Number(place.latitude)}
                 lng={Number(place.longitude)}
                 key={i}>
                 {
                     isDesktop? (
                         <LocationOnOutlinedIcon color="primary" fontSize="large" />
                     ):(
                         <Paper elevation={3} className={classes.paper}>
                             <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                             { `Electric Vehicle Charging Station ${place.location_id}`}
                             </Typography>
                             <img
                             className={classes.pointer}
                             src={
                                'https://bloximages.chicago2.vip.townnews.com/wmicentral.com/content/tncms/assets/v3/editorial/2/5f/25f85bff-a57c-5257-b976-4907fa140f49/602c4244a7bd2.image.jpg?resize=1200%2C900'}
                             alt={ `Electric Vehicle Charging Station ${place.location_id}`}
                             />
                             <Rating size="small" value={Number(place.rating)} readOnly />
                         </Paper>
                     )
                 }
                </div>))
        }
        </GoogleMapReact>
        </div>);
}

export default Map; 