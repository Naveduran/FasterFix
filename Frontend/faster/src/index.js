import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './routes/routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
	<StyledEngineProvider injectFirst>
	  <AppRoutes/>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
