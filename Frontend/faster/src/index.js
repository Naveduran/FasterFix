import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes/routes';
import { StyledEngineProvider } from '@mui/material/styles';
import { BounceIn } from 'react-animation-wrapper';

ReactDOM.render(
  <React.StrictMode>
    <BounceIn>
	    <StyledEngineProvider injectFirst>
	      <AppRoutes/>
      </StyledEngineProvider>
    </BounceIn>
  </React.StrictMode>,
  document.getElementById('root')
);
