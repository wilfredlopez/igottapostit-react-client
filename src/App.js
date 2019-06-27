import React from 'react';
import Layout from './components/layout/Layout'
import Routes from './Routes'
// import UIControl from './UIControl'
import CssBaseline from '@material-ui/core/CssBaseline'


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
      <footer style={{ marginTop: '4rem' }}>
        {// <UIControl />
        }
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>by WIlfred Lopez</p>
      </footer>
    </React.Fragment>
  );
}

export default App;
