import React from 'react'

import GoogleMapReact from 'google-map-react';
import {Paper,Typography,useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon  from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating'

import useStyles from './Styles'
import mapStyles from '../mapStyles'

const Map = ({setCoordinates,setBounds,coordinates,places,setChildClicked,weatherData}) => {
    const classes=useStyles();
    const matches=useMediaQuery('(min-width:600px)');
  

  return (
    <div className={classes.mapContainer}>

    <GoogleMapReact
         bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}  
         defaultCenter={coordinates}
         center={coordinates}
         defaultZoom={14}
         margin={[50,50,50,50]}
         options={{disableDefaultUI: true,zoomControl:true,styles:mapStyles}}
         onChange={(e)=>{
          setCoordinates({lat:e.center.lat,lng:e.center.lng});
          setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
         }}
         onChildClick={(child)=>setChildClicked(child)}>
         
         {
          places?.map((place,i)=>{
           return ( <div 
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            >
            
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>)
          })
         }
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}
    </GoogleMapReact>
    </div>
  )
}

export default Map
