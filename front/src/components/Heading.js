import React from 'react'
import { Typography } from '@material-ui/core'

const Heading = (props) => {
  const styles = {
    margin: 20,
  }
  return (
    <Typography variant="h2" style={styles}>{props.children}</Typography>
  )
}

export default Heading
