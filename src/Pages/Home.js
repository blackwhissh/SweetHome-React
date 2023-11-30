import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Header from "../Components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../Css/Home.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212529",
    },
  },
});

const cards = [
  {
    title: "Client",
    Role: "Tired Of Searching For Your Dream Home?",
    description: [
      "We Have Solution For You",
      "Upload a Request,",
      " Get an  Agent and He Will Search For You",
    ],
    buttonText: "Register Now",
    buttonVariant: "outlined",
    buttonLink: "/RegClient",
  },
  {
    title: "Agent",
    Role: "Simplify your life",
    description: [
      "Find The Right  ",
      "Client/Real Estate ",
      "With one click. ",
      "Save Money and The Most Valuable Time",
    ],
    buttonText: "Start Now",
    buttonVariant: "outlined",
    buttonLink: "/RegAgent",
  },
  {
    title: "Owner",
    Role: "Tired of constant calls ",
    description: ["Choose One Agent", "And Take a Break", "From Others!"],
    buttonLink: "/RegOwner",

    buttonText: "Register Now",
    buttonVariant: "outlined",
  },
];

export default function PricingTable() {
  return (
    <div>
      <Header></Header>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 5, pb: 6 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sweet Home
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
          >
            Register Now
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container
          maxWidth="md"
          component="main"
          sx={{
            mb: 8,
          }}
        >
          <Grid container spacing={5} alignItems="flex-end">
            {cards.map((card) => (
              <Grid
                item
                key={card.title}
                xs={12}
                sx={{ height: "100%" }}
                sm={4}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={card.title}
                    subheader={card.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 3,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h5"
                        color="success.main"
                        align="center"
                      >
                        {card.Role}
                      </Typography>
                    </Box>
                    <ul>
                      {card.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{
                        color: "white",
                        height: "48px",
                        padding: "0 30px",
                      }}
                      className="homeButtons"
                      fullWidth
                      variant={card.buttonVariant}
                    >
                      <Link
                        href={card.buttonLink}
                        sx={{
                          textDecoration: "none",
                        }}
                        variant="subtitle1"
                        color="success.main"
                      >
                        {card.buttonText}
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Footer */}

        <hr className="mt-auto" />
        <div className="container text-center mt-auto default-color faraway text-white mt-auto">
          <div className="row">
            <div className="col-1 col-md-3 mb-3 d-inline-block">
              <h3>Company</h3>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    about
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color ">
                    Contact
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-3 mb-3">
              <h3>Categories</h3>
              <ul className="nav flex-column d-inline-block">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Technology
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Gadgets
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Software
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Promo Codes
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    New sponsors
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-3 mb-3">
              <h3>Legal</h3>
              <ul className="nav flex-column d-inline-block">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Privacy
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Terms
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Cookie policy
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Intellectual Property
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Privacy Settings?
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 default-color">
                    Safety Tips
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <h3>Social</h3>
              <ul className="nav flex-column d-inline-block">
                <li className="nav-item mb-2 insta">
                  <a href="/" className="nav-link p-0 default-color">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                    </svg>
                    Instagram
                  </a>
                </li>
                <li className="nav-item mb-2 tiktok">
                  <a href="/" className="nav-link p-0 default-color">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M12.205 2.039h3.407s-.19 4.376 4.73 4.684v3.382s-2.625.165-4.73-1.442l.036 6.984a6.314 6.314 0 11-6.314-6.313h.886v3.458a2.87 2.87 0 102.016 2.741l-.031-13.494z"></path>
                    </svg>
                    Tiktok
                  </a>
                </li>
                <li className="nav-item mb-2 youtube">
                  <a href="/" className="nav-link p-0 default-color">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path>
                    </svg>
                    Youtube
                  </a>
                </li>
                <li className="nav-item mb-2 twitter">
                  <a href="/" className="nav-link p-0 default-color">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                    </svg>
                    Twitter
                  </a>
                </li>
                <li className="nav-item mb-2 facebook">
                  <a href="/" className="nav-link p-0 default-color">
                    <svg
                      focusable="false"
                      aria-hidden="true"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M16.563 8.424h-3.12V6.378c0-.769.51-.948.868-.948h2.202V2.05l-3.033-.012c-3.366 0-4.132 2.52-4.132 4.133v2.252H7.4v3.482h1.947v9.852h4.095v-9.852h2.763l.357-3.482z"></path>
                    </svg>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer className="bg-dark text-center text-white mt-auto">
          <div className="container p-4 pb-0">
            <section className="">
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-auto">
                    <p className="pt-2">
                      <strong>Sign up for our newsletter</strong>
                    </p>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="idk"
                        placeholder="Email Address"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-outline-light mb-4"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div className="text-center p-3 border-top copyRight">
            Copyright © Sweet Home {new Date().getFullYear()}{" "}
          </div>
        </footer>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}
