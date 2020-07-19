import React from "react";
import { Container, CssBaseline } from "@material-ui/core";

/* Used to wrap each view for a consistent frame */
const Layout = (props) => {
  return (
    <Container component="main">
      <CssBaseline />
      {props.children}
    </Container>
  );
};

export default Layout;
