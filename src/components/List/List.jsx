import React from 'react';
import { CircularProgress,Grid,
InputLabel,
MenuItem,
FormControl,
Select, 
Typography} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';
const List = ({places,isLoading,type,setType}) => {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <Typography variant="h4">
        EV Charging Stations
        </Typography>
        {isLoading? (<div className={classes.loading}>
        <CircularProgress size="5rem" />
        </div>) : (
          <>
        <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Electric Vehice Charging Station Tier 1</MenuItem>
              <MenuItem value="hotels">Electric Vehice Charging Station Tier 2</MenuItem>
              <MenuItem value="attractions">Electric Vehice Charging Station Tier 3</MenuItem>
            </Select>
        </FormControl>

        <Grid container spacing ={3} className={classes.list}>
          {places?.map((place,i) => (
            <Grid item key={i} xs={12}>
            <PlaceDetails place={place}
            />
          </Grid>))}
        </Grid>
        </>
        )}
      </div>);
}

export default List;