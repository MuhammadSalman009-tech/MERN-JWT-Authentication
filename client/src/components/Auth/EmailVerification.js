import {Button, Typography } from '@material-ui/core';
import React from 'react'
import useStyles from "./styles";
import {Link} from "react-router-dom";
function EmailVerification() {
    const classes=useStyles();
    return (
        <div>
            <Typography className={classes.success}>
                Your Account has been Successfully Activated.Click the link below to sign in...
            </Typography>
            <Typography>
                <Button component={Link} to="/signin">
                    Sign In
                </Button>
            </Typography>
        </div>
    )
}

export default EmailVerification
