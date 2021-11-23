import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Redirect, Route, Router, Switch, useHistory } from 'react-router-dom';
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import AddEditProduct from './modules/Admin/Screen/form/AddEditProduct';
import ProductList from './modules/Admin/Screen/list/ProductList';
import { PrivateRoute } from './modules/auth/component/ProtectedRoute';
import Login from './modules/auth/screen/Login';
import ProfileForm from './modules/auth/screen/ProfileForm';
import AvailableProducts from './modules/Products/screen/AvailableProducts';
import { useAppSelector } from './store/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '260px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const classes = useStyles();

  /**
   * Check login
   */
  useEffect(() => {
    if (!isLoggedIn) {
      history.replace('/login');
    }
  }, [isLoggedIn, history]);

  return (
    <div className="App">
      <Router history={history}>
        <Box className={classes.root}>
          <Box className={classes.header}>
            <Header />
          </Box>
          <Box className={classes.sidebar}>
            <Sidebar />
          </Box>
          <Box className={classes.main}>
            <Switch>
              <Route path="/" component={AvailableProducts} exact />
              {!isLoggedIn && <Route path="/login" component={Login} />}
              <PrivateRoute path="/profile" component={ProfileForm} />
              <PrivateRoute path="/admin/products" component={ProductList} exact />
              <PrivateRoute path="/admin/products/add" component={AddEditProduct} />
              <PrivateRoute path="/admin/products/:productId" component={AddEditProduct} />

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
