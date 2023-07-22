import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";

import { useAuth0 } from "@auth0/auth0-react";

import LandingPage from "./LandingPage";
import Gallery from "./Gallery";

export default function Home() {

     const { loginWithRedirect,user, isAuthenticated, logout } = useAuth0();

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {/* <Button color="inherit">Login</Button> */}

          {isAuthenticated && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user.nickname}
          </Typography>}
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
          {/* <Button color="inherit" onClick={() => loginWithRedirect()}>
            Login
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </Button> */}
        </Toolbar>
      </AppBar>
      {/* <div>
        <LandingPage/>
      </div> */}
      {!isAuthenticated ? (
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <div>Want to access art and Imagination Please Login!</div>
          </Grid>
          <Grid item xs={8}>
            <LandingPage />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Gallery/>
          </Grid>
          {/* <Grid item xs={8}>
            <LandingPage />
          </Grid> */}
        </Grid>
      )}
    </Box>
  );
}
