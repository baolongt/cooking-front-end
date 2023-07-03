import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

const defaultTheme = createTheme();
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
