import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import {App} from './App';
import './index.css';
import {StyledEngineProvider} from '@mui/material/styles';
import {CustomThemeProvider} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CustomThemeProvider>
      <StyledEngineProvider injectFirst>
        <App/>
      </StyledEngineProvider>
    </CustomThemeProvider>
  </Provider>
  // </React.StrictMode>
);
