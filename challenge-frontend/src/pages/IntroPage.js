import React from "react";
import Grid from "@mui/material/Grid";
import logo from "../homephoto.png";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/sedatbali44">
        Sedat Bali
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function IntroPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}></Grid>
      <Grid item xs={5}>
        <img src={logo} alt="Logo" />
        <Copyright variant="h6" sx={{ mt: 24, mb: 12 }} />
      </Grid>
    </Grid>
  );
}
