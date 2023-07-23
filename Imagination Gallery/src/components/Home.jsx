import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import  Image  from "../../src/assets/image.jpg";


import { useAuth0 } from "@auth0/auth0-react";

import LandingPage from "./LandingPage";
import Gallery from "./Gallery";



export default function Home() {

     const { loginWithRedirect,user, isAuthenticated, logout } = useAuth0();

     const [alignment, setAlignment] = useState("S3 Bucket");

     const handleChange = (event, newAlignment) => {
       setAlignment(newAlignment);
     };
     


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
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Imagination Gallery
          </Typography>

          {isAuthenticated && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {user.nickname}
            </Typography>
          )}
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              User Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              User Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!isAuthenticated ? (
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <img
              src={Image}
              width={500}
              height={550}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 15,
              }}
              alt="Welcome to the Landing Page"
            />
            <Button
              color="primary"
              variant="contained"
              style={{marginLeft:330,marginTop:10}}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={8} position="static">
            <LandingPage />
          </Grid>
        </Grid>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 23,
              position: "static",
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="S3 Bucket">S3 Bucket</ToggleButton>
              <ToggleButton value="Google Drive">Google Drive</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Grid container justifyContent="center" marginTop={5} marginLeft={7}>
            <Grid item xs={8}>
              <Gallery alignment={alignment} />
            </Grid>
          </Grid>
        </div>
      )}
    </Box>
  );
}
