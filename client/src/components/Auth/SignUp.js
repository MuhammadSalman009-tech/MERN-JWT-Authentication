import { Button, Container, Paper, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from './Input';
import useStyles from "./styles";
import axios from "axios";

const initialState={firstName:'', lastName:'', email:'', password:''};
function SignUp() {
    const classes=useStyles();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    
    const handleSubmit=async(e)=>{
        //getting targeted error elements
        const firstNameErr=document.querySelector(".firstName");
        const lastNameErr=document.querySelector(".lastName");
        const emailErr=document.querySelector(".email");
        const passwordErr=document.querySelector(".password");
        const emailSucces=document.querySelector(".emailSucces");
        const emailFailure=document.querySelector(".emailFailure");
        e.preventDefault();

        //seeting input errors to null on submit
        firstNameErr.innerHTML='';
        lastNameErr.innerHTML='';
        emailErr.innerHTML='';
        passwordErr.innerHTML='';
        emailFailure.innerHTML='';
        emailSucces.innerHTML='';
        try {
            const res=await axios.post('/user/signup',formData);
            console.log(res);
            if(res.data.emailSuccess){
                emailSucces.innerHTML=res.data.emailSuccess;
            }
            if(res.data.emailFailure){
                emailFailure.innerHTML=res.data.emailFailure;
            }
            // dispatch({type:"AUTH",payload:{result:res.data.result,token:res.data.token}});
            // history.push("/");
        } catch (error) {
            console.log(error)
            const msg=error.response.data;
            //seeting input errors to null on submit
            if(msg.firstNameErr){
                firstNameErr.innerHTML=msg.firstNameErr;
            }
            if(msg.lastNameErr){
                lastNameErr.innerHTML=msg.lastNameErr;
            }
            if(msg.emailErr){
                emailErr.innerHTML=msg.emailErr;
            }
            if(msg.passwordErr){
                passwordErr.innerHTML=msg.passwordErr;
            }
        }
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
                        <span className={`emailSucces ${classes.success}`}></span>
                        <span className={`emailFailure ${classes.error}`}></span>
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
