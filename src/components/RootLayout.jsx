import React from 'react'
import { Outlet } from 'react-router'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';

const RootLayout = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={1}>
         <Sidebar/>
        </Grid>
        <Grid item xs={11}>
          <Outlet/>
        </Grid>
      </Grid>
  )
}

export default RootLayout