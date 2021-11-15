import {
  TextField,
  Grid,
  Button,
  Typography,
  Paper,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import { CenterFocusStrong } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/UseForm";
import {
  obtenerLogin,
  obtenerLogout,
  registrarUsuario,
} from "../../redux/loginDucks";

const estilos = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  textbox: {
    marginBottom: 10,
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    width: 500,
    height: 200,
    padding: 20,
  },
  container: {
    height: "calc(100% - 70px)",
  },
}));

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: any) => state.login);

  const [open, setopen] = useState(true);

  const classes = estilos();

  const handleLoguin = (e: React.FormEvent) => {
    e.preventDefault();
    //dispatch(registrarUsuario(email, pass));
    dispatch(obtenerLogin(email, pass));
  };

  const [formValues, handleInputChange] = useForm({
    email: "",
    pass: "",
  });

  const { email, pass } = formValues;

  return (
    <div className={classes.container}>
      {/* <h1>LoginPage</h1> */}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        //   className={classes.container}
        spacing={2}
      >
        <Grid item>
          <Typography align="center" variant="h3">
            LoginPage
          </Typography>
          <Paper className={classes.paper}>
            <form autoComplete="on" onSubmit={handleLoguin}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className={classes.textbox}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="pass"
                value={pass}
                onChange={handleInputChange}
                className={classes.textbox}
              />

              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
                className={classes.textbox}
              >
                Login
              </Button>
            </form>
          </Paper>
          {error && (
            <>
              <Collapse in={open}>
                <Alert onClose={() => setopen(!open)} severity="error">
                  {error.code}
                </Alert>
              </Collapse>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
