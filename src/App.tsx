import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthContextProvider } from './provider/authContext';
import { ThemeProvider } from '@emotion/react';
import muiTheme from './theme';


function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>


  );
}

export default App;
