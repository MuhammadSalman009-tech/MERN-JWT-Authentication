import { makeStyles } from "@material-ui/core";

export default makeStyles(theme=>({
    authPaper:{
        padding:'20px'
    },
    mt20:{
        marginTop:'20px'
    },
    error:{
        color:theme.palette.error.main,
        marginLeft:'12px'
    },
    form:{
        marginTop:'50px'
    },
    success:{
        color:theme.palette.success.main,
        fontWeight:'bold'
    }
}))