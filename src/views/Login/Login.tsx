import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, withRouter } from "react-router-dom";
import { ILogin } from "../../interfaces/login";
import axios from "axios";
import { URL_API } from "../../services/URLApi";
import sweet from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState<ILogin>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (event: any) => {
    const { name, value } = event.target;
    setForm(() => ({ ...form, [name]: value }));
    setErrors(() => ({ ...errors, [name]: "" }));
  };

  const onSubmit = async () => {
    try {
      if (!form.username && !form.password) {
        setErrors(() => ({
          ...errors,
          username: "Este campo es obligatorio",
          password: "Este campo es obligatorio",
        }));
        return false;
      }

      if (!form.username) {
        setErrors(() => ({ ...errors, username: "Este campo es obligatorio" }));
        return false;
      }

      if (!form.password) {
        setErrors(() => ({ ...errors, password: "Este campo es obligatorio" }));
        return false;
      }
      const response = await axios({
        method: "POST",
        url: `${URL_API.login}`,
        data: form,
        headers: {
          "x-api-key": "VAhjFmZNBq4fW1oNXfJ6k43YzKwUbrmT2i8dQchY",
        },
      });

      if (response) {
        if (response.status === 200) {
          let redirect: Boolean = false;
          const fire: any = {
            icon: "success",
            title: "",
            text: "",
            confirmButtonText: "Ok, aceptar",
          };
          if (response.data.token) {
            fire.icon = "success";
            fire.title = "¡Completado!";
            fire.text = "Se ha iniciado sesión correctamente";
            redirect = true;
            sessionStorage.setItem("token", response.data.token);
          } else {
            fire.icon = "info";
            fire.title = "Upps!, ocurrió un error";
            fire.text = response.data.body;
          }
          return sweet.fire(fire).then(() => {
            if (redirect) {
              history.push("/");
            }
          });
        }
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="off"
            autoFocus
            onChange={onChangeForm}
            error={errors.username.length > 0}
            helperText={errors.username.length ? errors.username : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="off"
            onChange={onChangeForm}
            error={errors.password.length > 0}
            helperText={errors.password.length ? errors.password : ""}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(Login);
