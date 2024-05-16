import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import LoadingScreen from "../components/LoadingScreen";
import { AuthContext } from "../provider/authContext";

interface errorProps {
  isError: boolean;
  error: string;
}

export default function Login() {
  const naviagate = useNavigate()
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<errorProps>({ isError: false, error: "" });
  const ctx = useContext(AuthContext)

  const getUserDetails = async () => {
    axios({
      method: "get",
      url: baseUrl + "/api/user/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("blendnetAccessToken")}`,
      },

    }).then((res) => {
      if (res.data) {
        ctx?.setAuthData({
          isAuthenticated: true,
          name: res.data.first_name + " " + res.data.last_name,
          email: res.data.username,
        })
        naviagate("/")
      }
    }).catch((err) => {
      console.log(err)
      setError({
        isError: true,
        error: err?.response?.data?.detail
          ? err?.response?.data?.detail
          : "An error occurred",
      });

    })
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const loginFunc = async (email: string, password: string) => {
    setLoading(true);
    axios({
      method: "post",
      url: baseUrl + "/api/token/",
      data: {
        username: email,
        password: password,
      },
    }).then((res) => {

      setLoading(false);
      if (res.status === 200) {

        localStorage.setItem("blendnetAccessToken", res.data.access);
        localStorage.setItem("blendnetRefreshToken", res.data.refresh);
        getUserDetails()

        // window.location.href = "/dashboard";
      }
    }).catch((err) => {

      setLoading(false);
      setError({
        isError: true,
        error: err?.response?.data?.detail
          ? err?.response?.data?.detail
          : "An error occurred",
      });
    })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginFunc(String(data.get("email")), String(data.get("password")))
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
      component="main"
      maxWidth="sm"
    >
      <LoadingScreen open={loading} />
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow:
            "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
          padding: { xs: "15px 10px", lg: "25px 20px" },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={() => {
                  setError({ isError: false, error: "" })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={() => {
                  setError({ isError: false, error: "" })
                }}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              Don't have an account ?{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                to="/signup"
              >
                Sign up
              </Link>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, }}
          >
            Sign In
          </Button>
          {error.isError && <Typography sx={{ textAlign: "center", color: "#ef5350" }}>{error.error}</Typography>}
          <br />
        </Box>
      </Box>
    </Container>
  );
}
