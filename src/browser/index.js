import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../theme'
function Main() {
  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ThemeProvider>
  );
}



hydrate(
  <Main/>,
  document.getElementById('app')
);