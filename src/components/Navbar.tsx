import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import { obtenerLogout } from "../redux/loginDucks";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {

const dispatch = useDispatch()

  const classes = useStyles();

  const handleLogout = () =>{
    dispatch(obtenerLogout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          SuperHero Page
        </Typography>
        <Button onClick={handleLogout} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};
