import React from "react";
import { Typography } from "@material-ui/core";

const Heading = (props) => {
  return <Typography variant="h2">{props.children}</Typography>;
};

export default Heading;
