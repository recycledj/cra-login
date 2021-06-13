import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../../logo.svg";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home({ user = "Usuario" }) {
  const classes = useStyles();
  const history = useHistory();
  const [tokenExists, setTokenExists] = useState<String>("");

  const redirectToLogin = () => {
    history.push("/login");
  };

  const closeSession = () => {
    sessionStorage.clear();
    setTokenExists(() => "");
  };

  useEffect(() => {
    const token: String = sessionStorage.getItem("token") || "";
    setTokenExists(() => token);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} alt="Home" className="App-logo" />
        {tokenExists ? (
          <>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <Typography component="h1" variant="h6" align="center">
                  ¡Ya has iniciado sesión!
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={closeSession}
                >
                  Cerrar sesión
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <Typography component="h1" variant="h6" align="center">
                  No hay una sesión activa
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={redirectToLogin}
                >
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Container>
  );
}
