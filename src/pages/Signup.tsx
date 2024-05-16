import React, { useContext, useEffect, useState } from "react";
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
import LoadingScreen from "../components/LoadingScreen";
import baseUrl from "../utils/baseUrl";
import { AuthContext } from "../provider/authContext";

// TODO remove, this demo shouldn't need to reset the theme.

interface errorProps {
  isError: boolean;
  error: string;
}

export default function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<errorProps>({ isError: false, error: "" });
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
        navigate("/")
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

  const registerUser = async () => {


    setLoading(true);
    axios({
      method: "post",
      url: baseUrl + "/api/user/register/",
      data: {
        username: email,
        password: password,
        first_name: fName,
        last_name: lName,
      },
    })

      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          navigate("/login");
        }

      })
      .catch((err) => {
        setLoading(false);
        setError({
          isError: true,
          error: err?.response?.data?.username[0]
            ? err?.response?.data?.username[0]
            : "something went wrong",
        });
      });
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fName === "" || lName === "" || email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    registerUser();
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setError({ isError: false, error: "" });
                  setEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, }}
          >
            Sign Up
          </Button>
          {error.isError && <Typography sx={{ textAlign: "center", color: "#ef5350" }}>{error.error}</Typography>}

          <Grid sx={{ mt: 2, }} container justifyContent="flex-end">
            <Grid item>
              Already have an account ?{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                to="/login"
              >
                Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
