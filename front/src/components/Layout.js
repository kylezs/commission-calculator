import React from "react";
import { Container, CssBaseline } from "@material-ui/core";

const Layout = (props) => {
  return (
    <Container component="main">
      <CssBaseline />
      {props.children}
    </Container>
  );
};

export default Layout;
