import React,{useState} from 'react';
import {AppBar, Toolbar,Typography,InputBase, Box} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
                EV Charging Stations
            </Typography>
            <Box display="flex">
            <Link className={classes.link} to="/contact">Contact</Link>
            </Box>
        </Toolbar>
        </AppBar>);
}

export default Header;