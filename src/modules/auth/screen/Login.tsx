import { Box, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authActions } from '../auth-slice';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3rem auto',
    width: '95%',
    maxWidth: '25rem',
    borderRadius: '6px',
    textAlign: 'center',
    '& > *': {
      width: theme.spacing(45),
      height: theme.spacing(40),
    },
  },
  toggle: {
    marginTop: '1rem',
    padding: '0.15rem 3.5rem 0rem 4rem',
    display: 'flex',
    border: 'none',
    alignItems: 'center',
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoginClick = () => {
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    // TODO: Get username + pwd from login form
    if (isLogin) {
      dispatch(
        authActions.loginRequest({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        })
      );
    } else {
      dispatch(
        authActions.singUpRequest({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        })
      );
    }
  };
  // redirect to admin page
  useEffect(() => {
    if (authState.isLeave) {
      dispatch(authActions.setIsLeave({ isLeave: false }));
      history.push('/');
    }
  }, [authState.isLeave]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <div className="form_container">
          <h1 style={{ fontFamily: '"Pacifico", cursive' }}> {isLogin ? 'Login' : 'Sign Up'} </h1>
          <TextField
            className="input_email"
            id="email"
            label="email"
            type="text"
            inputRef={emailInputRef}
            autoComplete="current-email"
          />
          <br /> <br />
          <TextField
            className="input_password"
            id="password"
            label="Password"
            type="password"
            inputRef={passwordInputRef}
            autoComplete="current-password"
          />
          <Box mt={5}>
            <Button type="submit" variant="contained" color="primary" onClick={handleLoginClick}>
              {authState.logging && <CircularProgress size={20} color="secondary" />} &nbsp;{' '}
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="primary"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </Button>
          </Box>
        </div>
      </Paper>
    </div>
  );
}
