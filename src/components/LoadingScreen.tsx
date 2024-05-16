import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface loadingProps {
  open: boolean;

}

const LoadingScreen: React.FC<loadingProps> = (props) => {
  const { open } = props;

  return (
    <div style={{ position: "absolute" }}>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default LoadingScreen