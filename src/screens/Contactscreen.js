import React,{useState} from 'react';
import useStyles from './styles';
import swal from 'sweetalert';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
const Contactscreen = () => {
    const [formData, setFormData] = useState({ Name: '', Email: '', Message: ''});
    const classes = useStyles();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        let response = await fetch("http://localhost:5000/stations/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    let result = await response.json();
    console.log(result.status);
    if(result.status=="Message Sent")swal("Contact Us",`${result.status}`,"success");
    else swal("Contact Us",`${result.status}`,"error");
            clear();
     }
    return(
        <div className={classes.root}>
        <Paper className={classes.paper}>
        <form autoComplete="on" noValidate className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h6"> Contact Us</Typography>
          <TextField name="Name" variant="outlined" value={formData.Name} onChange={(e) => setFormData({...formData,Name: e.target.value})}  label="Name" fullWidth />
          <TextField name="Email" variant="outlined" value={formData.Email}  onChange={(e) => setFormData({...formData,Email: e.target.value})}  label="Email" fullWidth />
          <TextField label="Message" value={formData.Message}  onChange={(e) => setFormData({...formData,Message: e.target.value})} fullWidth multiline rows={5}/>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
        </form>
  </Paper>
        </div>
        )
}

export default Contactscreen;