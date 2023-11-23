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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" sx={{ textDecoration: "none" }} href="/">
        Sweet Home
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [
  {
    title: "Client",
    Role: "Rent",
    description: [
      "lodrem ipsum",
      "lorem ipsums",
      "lorem ipsumb",
      "lorem ipsumz",
    ],
    buttonText: "Register Now",
    buttonVariant: "outlined",
    buttonLink: "/RegClient",
  },
  {
    title: "Agent",
    Role: "rent",
    description: [
      "lorzcem ipsum lorem ipsum ",
      "lorem asdipsum lorem ipsum ",
      "loradem ipsum lorem ipsum ",
      "lorem ipsum loarem ipsum",
      "lorezcm ipsum lorem ipsum",
    ],
    buttonText: "Register Now",
    buttonVariant: "outlined",
    buttonLink: "/RegAgent",
  },
  {
    title: "Owner",
    Role: "work",
    description: [
      "loreadm zvipsum",
      "lorem ipsum",
      "loraem ipzxvsum",
      "lorczem ipszvum,lorem ipsum",
    ],
    buttonLink: "/RegOwner",

    buttonText: "Start Now",
    buttonVariant: "outlined",
  },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
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
          sx={{ pt: 8, pb: 6 }}
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
            start renting lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {cards.map((card) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={card.title}
                xs={12}
                sm={card.title === "Agent" ? 12 : 6}
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
                        variant="h3"
                        color="text.primary"
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
        <Container
          maxWidth="xl"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 8,
            py: [3, 5],
          }}
        >
          <Grid container spacing={3} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        sx={{ textDecoration: "none" }}
                        variant="subtitle1"
                        color="text.secondary"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Copyright sx={{ mt: 10 }} />
        </Container>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}
