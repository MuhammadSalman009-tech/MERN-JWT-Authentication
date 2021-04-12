import { Button, Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom';
import Input from './Input';
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import {signup} from "../Redux/Actions/authActions";

const initialState={firstName:'', lastName:'', email:'', password:''};
function SignUp() {
    const classes=useStyles();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const history=useHistory();
    
    const handleSubmit=async(e)=>{
        const firstNameErr=document.querySelector(".firstName");
        const lastNameErr=document.querySelector(".lastName");
        const emailErr=document.querySelector(".email");
        const passwordErr=document.querySelector(".password");
        const verificationText=document.querySelector(".verificationText");
        e.preventDefault();

        //seeting input errors to null on submit
        firstNameErr.innerHTML='';
        lastNameErr.innerHTML='';
        emailErr.innerHTML='';
        passwordErr.innerHTML='';
        verificationText.innerHTML='';
        dispatch(signup(formData,history))
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleShowPassword=()=>setShowPassword(prevShowPassword=> !prevShowPassword);
    return (
        <Container component="main" maxWidth="xs" className={classes.form}>
            <Paper className={classes.authPaper} elevation={3}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <span className={`verificationText ${classes.success}`}></span>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus/>
                        <span className={`firstName ${classes.error}`}></span>
                        <Input name="lastName" label="Last Name" handleChange={handleChange}/>
                        <span className={`lastName ${classes.error}`}></span>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <span className={`email ${classes.error}`}></span>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                        <span className={`password ${classes.error}`}></span>
                        {/* <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/> */}
                    </Grid>
                    <Button variant="contained" color="secondary" type="submit" fullWidth className={classes.mt20}>Sign Up</Button>
                    <Grid container justify="flex-end">
                        <Grid>
                            <Button component={Link} to="/signin" className={classes.mt20}>
                                Already have an account? Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default SignUp
