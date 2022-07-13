import React,{useState,useEffect,createRef} from 'react'
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select } from '@material-ui/core'
import useStyles from './Styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'


const List = ({places,childClicked,isLoading,type,setType,rating,setRating}) => {
  
    const classes=useStyles();
    const [elRefs,setElRefs]=useState([]);

     

    useEffect(()=>{
      setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
   
  return (
      <div className={classes.container}>
        <Typography variant='h4'>
            Restaurants, Hotels and Attractions around you!
        </Typography>

        {
         isLoading?(
          <div className={classes.loading}>
            <CircularProgress size="5rem"/>
          </div>
         ) : (
              <>
              <div style={{margin: '4px' }}>
                  <FormControl className={classes.formcontrol}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e)=>setType(e.target.value)}>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
                </FormControl>

                <FormControl className={classes.formcontrol}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <MenuItem value='0'>All</MenuItem>
                    <MenuItem value='3'>Above 3</MenuItem>
                    <MenuItem value='4'>Above 4</MenuItem>
                    <MenuItem value='4.5'>Above 4.5</MenuItem>
                </Select>
                </FormControl>
                </div>
                <Grid container spacing={3} className={classes.list}>
                     {places?.map((place, i) => (
                   <Grid ref={elRefs[i]} key={i} item xs={12}>
                       <PlaceDetails
                        selected={Number(childClicked) === i}
                        refProp={elRefs[i]}
                        place={place} />
                  </Grid>
                   ))}
               </Grid>
           </>)
        }
        
                
    </div>
    
  )
}


export default List

