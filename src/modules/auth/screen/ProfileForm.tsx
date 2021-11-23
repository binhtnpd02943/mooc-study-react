import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef } from 'react';
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

export default function ProfileForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const newPasswordInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoginClick = () => {
    const enteredNewPassWord = newPasswordInputRef.current?.value;
    // TODO: Get username + pwd from login form
    dispatch(
      authActions.updateUserRequest({
        password: enteredNewPassWord,
      })
    );
  };
  // redirect to admin page
  useEffect(() => {
    if (authState.isLeave) {
      dispatch(authActions.setIsLeave({ isLeave: false }));
      history.push('/');
    }
  }, [authState.isLeave]);

  return (
    <div className={classes.root}>
      <Paper elevation={15}>
        <div className="form_container">
          <h1 style={{ fontFamily: '"Pacifico", cursive' }}> New Password</h1>

          <TextField
            className="input_password"
            id="password"
            label="Password"
            type="password"
            inputRef={newPasswordInputRef}
            autoComplete="current-password"
          />
          <Box mt={5}>
            <Button type="submit" variant="contained" color="primary" onClick={handleLoginClick}>
              Change Password
            </Button>
          </Box>
        </div>
      </Paper>
    </div>
  );
}
