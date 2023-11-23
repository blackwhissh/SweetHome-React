import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../Components/Header";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Sweet Home
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  // input fields
  const [formData, setFormData] = useState({
    firstName: "asd",
    lastName: "asd",
    email: "asd@gmail.com",
    password: "123456789",
    gender: "FEMALE",
    phone: "593141427",
    nationality: "georgia",
    age: "65",
  });

  // handling validation set error for required fields
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      !firstNameError &&
        !lastNameError &&
        !emailError &&
        !genderError &&
        !phoneError &&
        !nationalityError &&
        !ageError &&
        !passwordError
    );
  }, [
    firstNameError,
    lastNameError,
    emailError,
    genderError,
    phoneError,
    nationalityError,
    ageError,
    passwordError,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "matchPassword") {
      setPasswordError(value !== formData.password);
      if (formData.matchPassword === "") {
        setPasswordError(value === formData.password);
      }
    }
    switch (name) {
      case "firstName":
        setFirstNameError(value.trim() === "");
        break;
      case "lastName":
        setLastNameError(value.trim() === "");
        break;
      case "email":
        setEmailError(value.trim() === "");
        break;
      case "gender":
        setGenderError(value.trim() === "");
        break;
      case "phone":
        setPhoneError(value.trim() === "");
        break;
      case "nationality":
        setNationalityError(value.trim() === "");
        break;
      case "age":
        setAgeError(value.trim() === "");
        break;
      case "Password":
        setPasswordError(value.trim() === "");
        break;

      default:
        break;
    }
    setIsFormValid(
      !firstNameError &&
        !lastNameError &&
        !emailError &&
        !genderError &&
        !phoneError &&
        !nationalityError &&
        !ageError &&
        !passwordError
    );
  };

  // set error  when user has interacted but not filled the required field
  const handleBlur = (e) => {
    const { name } = e.target;
    switch (name) {
      case "firstName":
        setFirstNameError(formData.firstName.trim() === "");
        break;
      case "lastName":
        setLastNameError(formData.lastName.trim() === "");
        break;
      case "email":
        setEmailError(formData.email.trim() === "");
        break;
      case "phone":
        setPhoneError(formData.phone.trim() === "");
        break;
      case "nationality":
        setNationalityError(formData.nationality.trim() === "");
        break;
      case "age":
        setAgeError(formData.age.trim() === "");
        break;
      case "Password":
        setPasswordError(formData.password.trim() === "");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/register/owner",
        formData
      );
      console.log("Registration successful:", response.data);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <div>
      <Header></Header>
      <Container component="main" maxWidth="xs">
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
            borderRadius: "3px",
            border: 0,
            marginTop: 2,
            color: "white",
            height: "48px",
            padding: "0 30px",
            boxShadow: "0 3px 5px 2px rgba(255, 51, 102, 0.3)",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 6px 10px 4px rgba(255, 51, 102, 0.3)",
            },
          }}
        >
          Owner Registration Form
        </Button>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            id="form"
            name="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    autoComplete="given-name"
                    type="text"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    error={firstNameError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      firstNameError && "Please enter Your First Name"
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    error={lastNameError}
                    helperText={lastNameError && "Please enter Your Last Name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type={"email"}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    error={emailError}
                    helperText={emailError && "Please enter Email"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <FormControl
                    sx={{
                      display: "inline-block",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel>Gender:</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Male"
                        value="MALE"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Female"
                        value="FEMALE"
                      />
                    </RadioGroup>
                  </FormControl>{" "}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    type={"number"}
                    label="Your Age"
                    name="age"
                    autoComplete="age"
                    value={formData.age}
                    error={ageError}
                    helperText={ageError && "Please enter Your Age"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    type={"tel"}
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    value={formData.phone}
                    error={phoneError}
                    helperText={phoneError && "Please enter Your Phone"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    id="nationality"
                    label="Nationality"
                    type="text"
                    name="nationality"
                    autoComplete="country-name"
                    value={formData.nationality}
                    error={nationalityError}
                    helperText={
                      nationalityError && "Please enter Your Nationality"
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {" "}
                <Box>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={"password"}
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={passwordError}
                    helperText={passwordError && "passwords don't match"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    name="matchPassword"
                    label="MatchPassword"
                    type={"password"}
                    error={passwordError}
                    id="MatchPassword"
                    onBlur={handleBlur}
                    helperText={passwordError && "passwords don't match"}
                    value={formData.MathPassword}
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree with company's Terms"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={!isFormValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/Login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
}
