import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
  },
});

const Layout = (props) => {

  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      {props.children}
    </Container>
    
  )
}

export default Layout
