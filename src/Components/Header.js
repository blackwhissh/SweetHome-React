import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const pages = ["Blog", "About", "Contact"];

function ResponsiveAppBar() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="full" sx={{ height: 55 }}>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <NavLink
              to="/"
              variant="h6"
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,

                color: "inherit",
                textDecoration: "none",
              }}
              className={"homeLink"}
            >
              Sweet Home
            </NavLink>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box>

            <NavLink className="Loglink" to="/Login" sx={{ fontSize: 30 }}>
              Login
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
