import { Button, Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Input from './Input';
import useStyles from "./styles";
import GoogleLogin from "react-google-login";
import { useDispatch } from 'react-redux';
import {signin} from "../Redux/Actions/authActions";

const initialState={email:'', password:''}
function AuthForm() {
    const classes=useStyles();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch = useDispatch();
    const history=useHistory();
    //google onSuccess method
    const googleSuccess=(response)=>{
        const result=response.profileObj;
        const token=response.tokenId;
        try {
            dispatch({type:"AUTH",payload:{result,token}});
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    }
    //google onSuccess method
    const googleFailure=(error)=>{
        console.log(error)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(signin(formData,history))
        
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleShowPassword=()=>setShowPassword(prevShowPassword=> !prevShowPassword);
    return (
        <Container component="main" maxWidth="xs" className={classes.form}>
            <Paper className={classes.authPaper} elevation={3} >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <span className={`emailVerified ${classes.error}`}></span>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <span className={`email ${classes.error}`}></span>
                        <Input 
                        name="password" 
                        label="Password" 
                        handleChange={handleChange} 
                        type={showPassword? "text":"password"} 
                        handleShowPassword={handleShowPassword}/>
                        <span className={`password ${classes.error}`}></span>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" fullWidth className={classes.mt20}>Sign In</Button>
                    
                    {/* google-login-button */}
                    <GoogleLogin
                        clientId="598518456977-52n11mpe3oorrqm689fcutch38nkl1ha.apps.googleusercontent.com"
                        render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" color="secondary" fullWidth className={classes.mt20}>Login with Google</Button>
                        )}
                        buttonText="Login"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justify="flex-end">
                        <Grid>
                            <Button component={Link} to="/signup" className={classes.mt20}>
                                Don't have an account? Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default AuthForm
