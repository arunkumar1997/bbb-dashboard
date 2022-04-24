import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import { signin } from "../services/Auth.service";

export default function BasicStack() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  });

  const handleChange = (prop) => (event) => {
    if (errors) setErrors("");
    setValues({ ...values, [prop]: event.target.value });
  };

  const initSignin = async (data) => {
    setLoading(true);
    const res = await signin(data);
    if (res.statusCode === 200) {
      const { jwt, user } = res;
      window.localStorage.setItem("jwt", jwt);
      window.localStorage.setItem("userData", JSON.stringify(user));
      router.push("/");
    } else if (res.statusCode === 400) {
      setErrors(res.errorMessage);
      setLoading(false);
    } else {
      setErrors("Something went wrong. Please try again after some time");
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={4} sx={{ mt: 25 }}>
        <Card sx={{ boxShadow: 2, p: 2 }}>
          <CardContent>
            <TextField
              variant="standard"
              standard-basic
              label="Email"
              onChange={handleChange("email")}
              sx={{ width: "100%", mb: 2 }}
            />
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography component="div" sx={{ color: "red" }}>
              {errors}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container direction="row" justifyContent="center" Elavated>
              <LoadingButton
                sx={{ px: 5 }}
                item
                variant="contained"
                size="large"
                onClick={() =>
                  initSignin({
                    email: values.email,
                    password: values.password,
                  })
                }
                loading={loading}
              >
                sign In
              </LoadingButton>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
